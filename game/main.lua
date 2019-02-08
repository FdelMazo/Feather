Gamestate = require("libs/gamestate")

window_width, window_height = love.window.getMode()
font = love.graphics.newFont("assets/Pixel UniCode.ttf", 32)
local bgm = love.audio.newSource("assets/environments.mp3", "stream")
local bgm2 = love.audio.newSource("assets/wow_so_secret.mp3", "stream")
local secret = true

feather = require("objects/feather")
rain = require("objects/rain")
box = require("objects/box")

intro = require("states/intro")
theo = require("states/theo")
breathing = require("states/breathing")


function love.load()
  love.graphics.setColor(255,255,255,255)
  love.graphics.setBackgroundColor( 0,0,0 )

  love.audio.play(bgm)
  Gamestate.registerEvents()
  Gamestate.switch(intro) 
end

function love.update(dt)
  if bgm:isStopped() and secret then love.audio.play(bgm2) ; secret = false end
end

function love.keyreleased(key)
  if key=='m' then
    if bgm:isPlaying() then love.audio.pause( bgm )
    else love.audio.play(bgm)
    end
  end
  
  if key=='escape' then
    Gamestate.switch(breathing)
  end

end
