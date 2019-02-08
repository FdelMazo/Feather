# Feather
:mountain: Mini Löve game (also playable on a web browser) to deal with anxiety and panic attacks, inspired by Celeste :mountain:

## Releases

On the web: https://fdelmazo.github.io/celeste-feather-game/

Windows: Download the executable from [here](https://github.com/fdelmazo/celeste-feather-game/releases)

Linux: Install the 0.10.1 version of [Löve](http://love2d.org/), download the `.love` file from [here](https://github.com/fdelmazo/celeste-feather-game/releases) and then run `love Feather.love`

### Web game

To deploy to the web, you need to add the submodules of the repo:

```shell
$ git clone https://github.com/FdelMazo/celeste-feather-game.git
$ git clone https://github.com/TannerRogalsky/love.js.git love.js-clean
$ mv love.js-clean lovejs
$ cd lovejs
$ git submodule update --init --recursive  
```

Then, just deploy with `make web`

### Windows

To create a windows executable, on Linux, you need the zipped version of Löve, downloadable [here](https://bitbucket.org/rude/love/downloads/love-0.10.1-win32.zip).

Then, just create it with `make windows`