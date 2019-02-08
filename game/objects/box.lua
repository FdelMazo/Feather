local box = {}

local seconds_to_appear = 3
local seconds_to_move = 5
local alpha = 0
local v = 0
local v_max = 70

local box_image = love.graphics.newImage( "assets/fog.png" )
local box_width = box_image:getWidth()
local box_height = box_image:getHeight()

local box_x_initial = window_width/2 - box_width/2
local box_x = box_x_initial
local box_y = window_height/2-box_height/2

local floor = window_height-box_height-box_height
local roof = box_height/2

local go_up = true

function box:draw()
    love.graphics.setColor(255,255,255,alpha)
    love.graphics.draw(box_image, box_x, box_y)
    love.graphics.setColor(255,255,255,255)
end

  
function box:update(dt)
    seconds_to_appear = seconds_to_appear - dt
    if seconds_to_appear > 0 then return end
    alpha = alpha+dt*10

    seconds_to_move = seconds_to_move - dt
    if seconds_to_move > 0 then return end

    local k
    if go_up then k = -1  else k = 1 end

    v = v + dt*5
    if v > v_max then v = v_max end

    if box_y > floor then box_y = floor ; go_up = true end
    if box_y < roof then box_y = roof ; go_up = false end      
    
    box_y = box_y + k*dt*v
end

return box