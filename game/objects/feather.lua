local feather = {}

local feather_image = love.graphics.newImage( "assets/Feather.png" )
local feather_height = feather_image:getHeight()
local feather_width = feather_image:getWidth()
local feather_x_initial = window_width/2
local feather_y_initial = window_height/2-feather_height/2

local feather_x = feather_x_initial
local feather_y = feather_y_initial

local floor = window_height+feather_height
local roof = -feather_height

local go_to_right = true

local velocity = 0
local acceleration = -100


function feather:draw()
    love.graphics.draw(feather_image, feather_x, feather_y, rotation, 1, 1, feather_width/2, feather_height/2 )
end

function feather:getDimensions()
    return feather_width, feather_height, feather_x_initial, feather_y_initial, rotation_initial
end

function feather:rotate(dt)
    if rotation < -0.2 then
        go_to_right = true
    elseif rotation > 0.1 then 
        go_to_right = false
    end
  
    local k
    if go_to_right then k = 1 else k = -1 end
    local seconds = 6
    
    if love.keyboard.isDown('space') then
        seconds = 10
    end

    rotation = rotation + k*dt/seconds
end

function feather:translate(dt)
    local k
    if go_to_right then k = -1 else k = 1 end

    feather_x = feather_x + k*dt*20
end

function feather:ascend(dt)
    if love.keyboard.isDown('space') then
        velocity = velocity - 5
    end
    
    if not (velocity == 0) then
        feather_y = feather_y + velocity * dt
        velocity = velocity - acceleration * dt
    end
end
  
function feather:update(dt,ascend)
    if feather_y > floor then feather_y = floor ; velocity = 0 end
    if feather_y < roof then feather_y = roof ; velocity = 10 end      

    feather:rotate(dt)
    feather:translate(dt)
    if ascend then feather:ascend(dt) end
end

return feather