local params = {}


local feather_image = love.graphics.newImage( "assets/Feather.png" )
local feather_height = feather_image:getHeight()
local feather_width = feather_image:getWidth()

return {
    window_width = window_width,
    window_height =  window_height,
    feather_image = feather_image,
    feather_height = feather_height,
    feather_width = feather_width,   
    feather_x_initial = window_width/2,
    feather_y_initial = window_height*2/3-feather_height/2
}