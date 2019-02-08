local feather = {}

local feather_x = PARAMS.feather_x_initial
local feather_y = PARAMS.feather_y_initial 

local floor = PARAMS.window_height+PARAMS.feather_height/2
local roof = -PARAMS.feather_height/2

local translation_right = true
local rotation_clockwise = true
local rotation = 0

local velocity = 0
local acceleration = -100

function feather:enter()
  love.graphics.setColor(255,255,255,255)
  love.graphics.setBackgroundColor( 0,0,0 )
end

function feather:update(dt)
  feather_x = feather_x + oscilation_translation(dt,feather_x)
  rotation = rotation + oscilation_rotation(dt,rotation)
  
  if feather_y > floor then feather_y = floor ; velocity = 0 end
  if feather_y < roof then feather_y = roof ; velocity = 10 end

  if love.keyboard.isDown('space') then
    velocity = velocity - 5
  end
  
  if not (velocity == 0) then
		feather_y = feather_y + velocity * dt
		velocity = velocity - acceleration * dt
  end
  
end

function feather:draw()
  love.graphics.draw(PARAMS.feather_image, feather_x, feather_y, rotation, 1, 1, PARAMS.feather_width/2, PARAMS.feather_height/2 )
end

function oscilation_translation(dt, feather_x)
  local k = -1
  if not translation_right then k = 1 end
  
  if feather_x > PARAMS.feather_x_initial + PARAMS.feather_width then
    translation_right = false
  elseif feather_x < PARAMS.feather_x_initial - PARAMS.feather_width then 
    translation_right = true
  end

  return k*dt*20
end

function oscilation_rotation(dt, rotation) 
  local k = 1
  local s = 4

  if love.keyboard.isDown('space') then
    s = 10
  end
  if not translation_right then k = -1 end
  
  if rotation < -0.3 then
    translation_right = true
  end
  if rotation > 0.35 then 
    translation_right = false
  end

  return k*dt/s
end

return feather