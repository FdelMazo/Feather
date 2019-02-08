Gamestate = require("libs/gamestate")
PARAMS = require("params")

intro_state = require("intro")
theodialogue_state = require("theodialogue")
feather_state = require("feather")

local bgm = love.audio.newSource("assets/environments.mp3", "stream")

function love.load()
  love.graphics.setColor(255,255,255,255)
  love.graphics.setBackgroundColor( 0,0,0 )

  love.audio.play(bgm)
  Gamestate.registerEvents()
  Gamestate.switch(intro_state) 
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
  
  if key=='escape' then
    Gamestate.switch(feather_state)
  end

end