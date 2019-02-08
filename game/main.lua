Gamestate = require("libs/gamestate")

window_width, window_height = love.window.getMode()
font = love.graphics.newFont("assets/Pixel UniCode.ttf", 32)
local bgm = love.audio.newSource("assets/environments.mp3", "stream")

feather = require("objects/feather")
rain = require("objects/rain")

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

function love.keyreleased(key)
  if key=='m' then
    if bgm:isPlaying() then love.audio.pause( bgm )
    else love.audio.play( bgm )
    end
  end
  
  if key=='escape' then
    Gamestate.switch(breathing)
  end

end