build:
	cd lovejs/debug && python2 ../emscripten/tools/file_packager.py game.data --preload ../../game@/ --js-output=game.js
	mv lovejs/debug/game.* ./
