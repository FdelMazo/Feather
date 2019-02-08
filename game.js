
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
Module['FS_createPath']('/', 'objects', true, true);
Module['FS_createPath']('/', 'assets', true, true);
Module['FS_createPath']('/', 'states', true, true);
Module['FS_createPath']('/', 'libs', true, true);

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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 3477, "filename": "/conf.lua"}, {"audio": 0, "start": 3477, "crunched": 0, "end": 4282, "filename": "/main.lua"}, {"audio": 0, "start": 4282, "crunched": 0, "end": 4987, "filename": "/objects/rain.lua"}, {"audio": 0, "start": 4987, "crunched": 0, "end": 6795, "filename": "/objects/feather.lua"}, {"audio": 1, "start": 6795, "crunched": 0, "end": 60081, "filename": "/assets/theo3.wav"}, {"audio": 0, "start": 60081, "crunched": 0, "end": 60266, "filename": "/assets/raindrop.png"}, {"audio": 1, "start": 60266, "crunched": 0, "end": 111132, "filename": "/assets/theo5.wav"}, {"audio": 1, "start": 111132, "crunched": 0, "end": 164266, "filename": "/assets/theo4.wav"}, {"audio": 1, "start": 164266, "crunched": 0, "end": 218754, "filename": "/assets/theo7.wav"}, {"audio": 0, "start": 218754, "crunched": 0, "end": 259074, "filename": "/assets/favicon.png"}, {"audio": 1, "start": 259074, "crunched": 0, "end": 344364, "filename": "/assets/theo1.wav"}, {"audio": 0, "start": 344364, "crunched": 0, "end": 723312, "filename": "/assets/Pixel UniCode.ttf"}, {"audio": 0, "start": 723312, "crunched": 0, "end": 733300, "filename": "/assets/Feather.png"}, {"audio": 1, "start": 733300, "crunched": 0, "end": 786584, "filename": "/assets/theo6.wav"}, {"audio": 1, "start": 786584, "crunched": 0, "end": 851926, "filename": "/assets/theo2.wav"}, {"audio": 1, "start": 851926, "crunched": 0, "end": 931428, "filename": "/assets/theo8.wav"}, {"audio": 1, "start": 931428, "crunched": 0, "end": 16362416, "filename": "/assets/environments.mp3"}, {"audio": 0, "start": 16362416, "crunched": 0, "end": 16485571, "filename": "/assets/Theo.png"}, {"audio": 0, "start": 16485571, "crunched": 0, "end": 16487752, "filename": "/states/theo.lua"}, {"audio": 0, "start": 16487752, "crunched": 0, "end": 16489286, "filename": "/states/intro.lua"}, {"audio": 0, "start": 16489286, "crunched": 0, "end": 16489607, "filename": "/states/breathing.lua"}, {"audio": 0, "start": 16489607, "crunched": 0, "end": 16506414, "filename": "/libs/Moan.lua"}, {"audio": 0, "start": 16506414, "crunched": 0, "end": 16510180, "filename": "/libs/gamestate.lua"}, {"audio": 0, "start": 16510180, "crunched": 0, "end": 16510720, "filename": "/libs/moandefault.png"}], "remote_package_size": 16510720, "package_uuid": "34c4f2fe-8a67-4e84-8aef-6c3d4419ca30"});

})();
