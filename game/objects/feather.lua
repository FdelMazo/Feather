local feather = {}

local feather_image = love.graphics.newImage( "assets/Feather.png" )
local feather_height = feather_image:getHeight()
local feather_width = feather_image:getWidth()
local feather_x_initial = window_width/2
local feather_y_initial = window_height*2/3-feather_height/2

function feather:draw(x,y,rotation)
    local rotation = rotation or 0
    local x = x or feather_x_initial
    local y = y or feather_y_initial
    love.graphics.draw(feather_image, x, y, rotation, 1, 1, feather_width/2, feather_height/2 )
end

function feather:getDimensions()
    return feather_width, feather_height, feather_x_initial, feather_y_initial, rotation_initial
end

function feather:rotate(dt, rotation, go_to_right)
    local k
    if go_to_right then k = 1 else k = -1 end
    local seconds = 10
    
    if love.keyboard.isDown('space') then
        seconds = 15
    end
    
    return k*dt/seconds
end

function feather:translate(dt, feather_x, go_to_right)
    local k
    if go_to_right then k = -1 else k = 1 end
    
    return k*dt*20
  end
  
      

return feather