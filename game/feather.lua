local feather = {}

function feather:enter()
  love.graphics.setBackgroundColor( 0,0,0 )
end

function feather:update(dt)
end

function feather:draw()
  love.graphics.setColor( 214,214,0,255)
  local width, height, _ = love.window.getMode( )
  love.graphics.rectangle("fill", (width/2)-(180/2), (height*2/3)-(60/2), 180, 60 )
end

function feather:keyreleased(key)
end

return feather