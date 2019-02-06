# Feather
:mountain: Mini Löve game (also playable on a web browser) to deal with anxiety and panic attacks, inspired by Celeste :mountain:

## Set-up for developing

Repository set-up (you need the love.js files for deploying to the web)

```shell
$ git clone https://github.com/FdelMazo/celeste-feather-game.git
$ git clone https://github.com/TannerRogalsky/love.js.git lovejs
$ cd lovejs
$ git submodule update --init --recursive  
```

Local development: `love game/`

Porting from the love app to the web: `make build`