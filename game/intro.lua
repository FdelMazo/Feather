local intro = {}

Gamestate = require("libs/gamestate")

local theodialogue = require("theodialogue")

local font_height_separation = 90
local font_speed_separation = 1

function intro:enter()
  love.graphics.setBackgroundColor( 0,0,0 )
  love.graphics.setFont(love.graphics.newFont("assets/Pixel UniCode.ttf", 32))
  alpha = 0
end

function intro:update(dt)
    alpha = alpha + (dt * (255 / 3))
    alpha2 = alpha - 100
    alpha3 = alpha2 - 100
    alpha4 = alpha3 - 100
end

function intro:draw()
    local height = 100

    love.graphics.setColor(255,255,255, alpha)
    love.graphics.print("Feather", 100, height)    

    height = height + font_height_separation

    love.graphics.setColor(255,255,255,alpha2)
    love.graphics.print("This Mini-Game is inspired by the spectacular Celeste.", 100, height)

    height = height + font_height_separation

    love.graphics.setColor(255,255,255,alpha3)
    love.graphics.print("Best played with sound (but can be turned off with m)", 100, height)

    height = height + font_height_separation

    love.graphics.setColor(255,255,255,alpha4)
    love.graphics.print("Press Spacebar to Continue", 100, height)
end

function intro:keyreleased(key)
  if key=='space' then
    Gamestate.switch(theodialogue)
  end
end

return intro