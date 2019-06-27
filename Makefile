web:
	# Deploys to the web
	# Needs to update the submodules of the repo
	# $ git clone https://github.com/TannerRogalsky/love.js.git love.js-clean
	# $ mv love.js-clean lovejs
	# $ cd lovejs
	# $ git submodule update --init --recursive  
	cd lovejs/release-compatibility && python2 ../emscripten/tools/file_packager.py game.data --preload  ../../game@/ --js-output=game.js
	mv lovejs/release-compatibility/game.* ./

love: 
	# Makes .love file
	mkdir -p releases
	cd game && zip -9 -r ../releases/Feather.love *

windows: love
	# Makes a windows 32bit executable from Linux
	# Needs zipped version of love
	# https://bitbucket.org/rude/love/downloads/love-0.10.1-win32.zip
	mkdir -p releases
	mkdir -p releases/Feather-win32
	cat love-0.10.1-win32/love.exe releases/Feather.love > releases/Feather-win32/Feather.exe
	cd love-0.10.1-win32 && cp *.dll license.txt ../releases/Feather-win32/
	zip -9 -r -j releases/Feather-win32.zip releases/Feather-win32

clean:
	rm -rf releases/