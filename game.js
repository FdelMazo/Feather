
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'assets', true, true);
Module['FS_createPath']('/', 'libs', true, true);
Module['FS_createPath']('/', 'objects', true, true);
Module['FS_createPath']('/', 'states', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      },
    };

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
  
          var files = metadata.files;
          for (i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_game.data');

    };
    Module['addRunDependency']('datafile_game.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 1020, "filename": "/main.lua"}, {"audio": 0, "start": 1020, "crunched": 0, "end": 1308, "filename": "/conf.lua"}, {"audio": 1, "start": 1308, "crunched": 0, "end": 55796, "filename": "/assets/theo7.wav"}, {"audio": 0, "start": 55796, "crunched": 0, "end": 178951, "filename": "/assets/Theo.png"}, {"audio": 1, "start": 178951, "crunched": 0, "end": 264241, "filename": "/assets/theo1.wav"}, {"audio": 0, "start": 264241, "crunched": 0, "end": 643189, "filename": "/assets/Pixel UniCode.ttf"}, {"audio": 0, "start": 643189, "crunched": 0, "end": 653177, "filename": "/assets/Feather.png"}, {"audio": 1, "start": 653177, "crunched": 0, "end": 706463, "filename": "/assets/theo3.wav"}, {"audio": 1, "start": 706463, "crunched": 0, "end": 771805, "filename": "/assets/theo2.wav"}, {"audio": 0, "start": 771805, "crunched": 0, "end": 907473, "filename": "/assets/fog.png"}, {"audio": 0, "start": 907473, "crunched": 0, "end": 947793, "filename": "/assets/favicon.png"}, {"audio": 1, "start": 947793, "crunched": 0, "end": 1027295, "filename": "/assets/theo8.wav"}, {"audio": 1, "start": 1027295, "crunched": 0, "end": 1080579, "filename": "/assets/theo6.wav"}, {"audio": 1, "start": 1080579, "crunched": 0, "end": 6748303, "filename": "/assets/environments.mp3"}, {"audio": 0, "start": 6748303, "crunched": 0, "end": 6748488, "filename": "/assets/raindrop.png"}, {"audio": 1, "start": 6748488, "crunched": 0, "end": 6801622, "filename": "/assets/theo4.wav"}, {"audio": 1, "start": 6801622, "crunched": 0, "end": 6852488, "filename": "/assets/theo5.wav"}, {"audio": 0, "start": 6852488, "crunched": 0, "end": 6856254, "filename": "/libs/gamestate.lua"}, {"audio": 0, "start": 6856254, "crunched": 0, "end": 6873061, "filename": "/libs/Moan.lua"}, {"audio": 0, "start": 6873061, "crunched": 0, "end": 6873601, "filename": "/libs/moandefault.png"}, {"audio": 0, "start": 6873601, "crunched": 0, "end": 6874362, "filename": "/objects/rain.lua"}, {"audio": 0, "start": 6874362, "crunched": 0, "end": 6876438, "filename": "/objects/feather.lua"}, {"audio": 0, "start": 6876438, "crunched": 0, "end": 6877592, "filename": "/objects/box.lua"}, {"audio": 0, "start": 6877592, "crunched": 0, "end": 6879814, "filename": "/states/theo.lua"}, {"audio": 0, "start": 6879814, "crunched": 0, "end": 6880166, "filename": "/states/breathing.lua"}, {"audio": 0, "start": 6880166, "crunched": 0, "end": 6881704, "filename": "/states/intro.lua"}], "remote_package_size": 6881704, "package_uuid": "bfa298ae-02ea-4999-b9bc-98aabc3202b2"});

})();
