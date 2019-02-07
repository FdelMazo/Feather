local feather = {}

local window_width, window_height, _ = love.window.getMode( )


local feather_image = love.graphics.newImage( "assets/Feather.png" )
local feather_width = feather_image:getWidth()
local feather_height = feather_image:getHeight()
local feather_x = (window_width/2)-(feather_width/2)
local feather_y = (window_height*2/3)-(feather_height/2)


local floor = window_height + feather_height
local roof = -feather_height/2

local velocity = 0
local acceleration = -100

function feather:enter()
  love.graphics.setBackgroundColor( 0,0,0 )
end

function feather:update(dt)
  -- descend(dt)
  if love.keyboard.isDown('space') then
    velocity = velocity - 5
	end

  if not (velocity == 0) then
		feather_y = feather_y + velocity * dt
		velocity = velocity - acceleration * dt
  end
  
  if feather_y > floor then feather_y = floor end
end

function feather:draw()
  love.graphics.setColor( 214,214,0,255)
  love.graphics.draw(feather_image, feather_x, feather_y)
end

return feather