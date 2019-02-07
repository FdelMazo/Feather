local feather = {}

local window_width, window_height, _ = love.window.getMode( )

local feather_width = 180
local feather_height = 60
local feather_x = (window_width/2)-(feather_width/2)
local feather_y = (window_height*2/3)-(feather_height/2)
 
local piso = window_height - feather_height/2
local techo = -feather_height/2

local ascent = false

function feather:enter()
  love.graphics.setBackgroundColor( 0,0,0 )
end

function feather:update(dt)
  descend(dt)
  if ascent then ascend(dt) end
end

function feather:draw()
  love.graphics.setColor( 214,214,0,255)
  love.graphics.rectangle("fill", feather_x, feather_y, feather_width, feather_height )
end

function descend(dt) 
  feather_y = feather_y + (dt*100)
  if feather_y > piso then feather_y = piso end
end

function ascend(dt) 
  feather_y = feather_y - (dt*200)
  if feather_y < techo then feather_y = techo end
end

function feather:keypressed(key)
  if key=='space' then
    ascent = true
  end
end

function feather:keyreleased(key)
  if key=='space' then
    ascent = false
  end
end

return feather