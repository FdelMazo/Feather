local intro = {}

local font_height_separation = 90
local font_speed_separation = 80
local alpha,alpha2,alpha3,alpha4,alpha5 = 0,0,0,0,0
local shown_all_text = false

function intro:enter()
  love.graphics.setFont(font)
end

function intro:update(dt)
    if not shown_all_text then 
      alpha = alpha + (dt * (255 / 7))
      alpha2 = alpha - font_speed_separation
      alpha3 = alpha2 - font_speed_separation
      alpha4 = alpha3 - font_speed_separation
      alpha5 = alpha4 - font_speed_separation
    end
end

function intro:draw()
    local height = 100

    love.graphics.setColor(154, 205, 237,alpha5)
    love.graphics.rectangle("fill", 0, 0, window_width,window_height)

    love.graphics.setColor(255,255,255, alpha)
    love.graphics.print("Feather", 100, height)    

    height = height + font_height_separation

    love.graphics.setColor(255,255,255,alpha2)
    love.graphics.print("This Mini-Game is inspired by the spectacular Celeste.", 100, height)

    height = height + font_height_separation

    love.graphics.setColor(255,255,255,alpha3)
    love.graphics.print("Sound can be turned on with M", 100, height)

    height = height + font_height_separation

    love.graphics.setColor(255,255,255,alpha4)
    love.graphics.print("Press Spacebar or Left click to Continue", 100, height)
end

function intro:keyreleased(key)
  if key=='space' then
    if shown_all_text then Gamestate.switch(theo) end
    alpha,alpha2,alpha3,alpha4,alpha5 = 255,255,255,255,255
    shown_all_text = true    
  end
end

return intro