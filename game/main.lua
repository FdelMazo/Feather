Gamestate = require("libs/gamestate")

local intro = require("intro")
local bgm = love.audio.newSource("assets/environments.mp3", "stream")

function love.load()
  love.audio.play(bgm)
  Gamestate.registerEvents()
  Gamestate.switch(intro) 
end

function love.update(dt)
end

function love.draw()
end

function love.keyreleased(key)
  if key=='m' then
    if bgm:isPlaying() then love.audio.pause( bgm )
    else love.audio.play( bgm )
    end
  end
end