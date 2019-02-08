local breathing = {}

local feather_height, feather_width, feather_x_initial, feather_y_initial, rotation_initial = feather:getDimensions()

local feather_x = feather_x_initial
local feather_y = feather_y_initial

local floor = window_height+feather_height/2
local roof = -feather_height/2

local go_to_right = true

local velocity = 0
local acceleration = -100

function breathing:enter()
  love.graphics.setColor(255,255,255,255)
  love.graphics.setBackgroundColor( 0,0,0 )
  rain:load()
end

function breathing:update(dt)      
  
  if rotation < -0.3 then
      go_to_right = true
  elseif rotation > 0.35 then 
      go_to_right = false
  end

  if feather_x > feather_x_initial + feather_width then
    go_to_right = true
  elseif feather_x < feather_x_initial - feather_width then 
    go_to_right = false
  end

  feather_x = feather_x + feather:translate(dt,feather_x, go_to_right)
  rotation = rotation + feather:rotate(dt,rotation, go_to_right)
  
  if feather_y > floor then feather_y = floor ; velocity = 0 end
  if feather_y < roof then feather_y = roof ; velocity = 10 end

  if love.keyboard.isDown('space') then
    velocity = velocity - 5
  end
  
  if not (velocity == 0) then
		feather_y = feather_y + velocity * dt
		velocity = velocity - acceleration * dt
  end

  if love.keyboard.isDown('space') then
    rain:emit(1)
  end

  rain:update(dt)
  
end

function breathing:draw()
  feather:draw(feather_x,feather_y, rotation)
  rain:draw()
end


return breathing