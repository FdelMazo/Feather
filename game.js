
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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 288, "filename": "/conf.lua"}, {"audio": 0, "start": 288, "crunched": 0, "end": 1211, "filename": "/main.lua"}, {"audio": 0, "start": 1211, "crunched": 0, "end": 1940, "filename": "/objects/rain.lua"}, {"audio": 0, "start": 1940, "crunched": 0, "end": 3956, "filename": "/objects/feather.lua"}, {"audio": 0, "start": 3956, "crunched": 0, "end": 5110, "filename": "/objects/box.lua"}, {"audio": 1, "start": 5110, "crunched": 0, "end": 58396, "filename": "/assets/theo3.wav"}, {"audio": 0, "start": 58396, "crunched": 0, "end": 58581, "filename": "/assets/raindrop.png"}, {"audio": 1, "start": 58581, "crunched": 0, "end": 109447, "filename": "/assets/theo5.wav"}, {"audio": 1, "start": 109447, "crunched": 0, "end": 162581, "filename": "/assets/theo4.wav"}, {"audio": 1, "start": 162581, "crunched": 0, "end": 217069, "filename": "/assets/theo7.wav"}, {"audio": 0, "start": 217069, "crunched": 0, "end": 257389, "filename": "/assets/favicon.png"}, {"audio": 1, "start": 257389, "crunched": 0, "end": 342679, "filename": "/assets/theo1.wav"}, {"audio": 0, "start": 342679, "crunched": 0, "end": 721627, "filename": "/assets/Pixel UniCode.ttf"}, {"audio": 0, "start": 721627, "crunched": 0, "end": 731615, "filename": "/assets/Feather.png"}, {"audio": 1, "start": 731615, "crunched": 0, "end": 784899, "filename": "/assets/theo6.wav"}, {"audio": 1, "start": 784899, "crunched": 0, "end": 850241, "filename": "/assets/theo2.wav"}, {"audio": 1, "start": 850241, "crunched": 0, "end": 929743, "filename": "/assets/theo8.wav"}, {"audio": 0, "start": 929743, "crunched": 0, "end": 1065411, "filename": "/assets/fog.png"}, {"audio": 1, "start": 1065411, "crunched": 0, "end": 6733135, "filename": "/assets/environments.mp3"}, {"audio": 0, "start": 6733135, "crunched": 0, "end": 6856290, "filename": "/assets/Theo.png"}, {"audio": 0, "start": 6856290, "crunched": 0, "end": 6858485, "filename": "/states/theo.lua"}, {"audio": 0, "start": 6858485, "crunched": 0, "end": 6860023, "filename": "/states/intro.lua"}, {"audio": 0, "start": 6860023, "crunched": 0, "end": 6860375, "filename": "/states/breathing.lua"}, {"audio": 0, "start": 6860375, "crunched": 0, "end": 6877182, "filename": "/libs/Moan.lua"}, {"audio": 0, "start": 6877182, "crunched": 0, "end": 6880948, "filename": "/libs/gamestate.lua"}, {"audio": 0, "start": 6880948, "crunched": 0, "end": 6881488, "filename": "/libs/moandefault.png"}], "remote_package_size": 6881488, "package_uuid": "43d678d5-809c-48fa-bcb6-5fe634df7a1b"});

})();
