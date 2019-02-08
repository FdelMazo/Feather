local breathing = {}

function breathing:enter()
  love.graphics.setColor(255,255,255,255)
  love.graphics.setBackgroundColor( 0,0,0 )
  rain:load()
end

function breathing:update(dt)      
  feather:update(dt, true)
  rain:update(dt)  
end

function breathing:draw()
  feather:draw()
  rain:draw()
end


return breathing