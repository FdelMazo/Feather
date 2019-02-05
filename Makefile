build:
	cd love.js/debug && python2 ../emscripten/tools/file_packager.py game.data --preload ../../game@/ --js-output=game.js
	mv love.js/debug/game.* web/
