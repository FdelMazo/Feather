web:
	cd lovejs/release-compatibility && python2 ../emscripten/tools/file_packager.py game.data --preload  ../../game@/ --js-output=Feather.js
	mv lovejs/release-compatibility/Feather.* ./

love: releases
	cd game && zip -9 -r ../releases/Feather.love *

windows: love
	mkdir -p releases/Feather-win32
	cat love-0.10.1-win32/love.exe releases/Feather.love > releases/Feather-win32/Feather.exe
	cd love-0.10.1-win32 && cp *.dll license.txt ../releases/Feather-win32/
	zip -9 -r -j releases/Feather-win32.zip releases/Feather-win32

releases:
	mkdir -p releases