local feather = {}

local feather_image = love.graphics.newImage( "assets/Feather.png" )
local feather_height = feather_image:getHeight()
local feather_width = feather_image:getWidth()
local feather_x_initial = window_width/2
local feather_y_initial = window_height*2/3-feather_height/2

function feather:draw(x,y)
    local x = x or feather_x_initial
    local y = y or feather_y_initial
    love.graphics.draw(feather_image, x, y, 0, 1, 1, feather_width/2, feather_height/2 )
end

return feather