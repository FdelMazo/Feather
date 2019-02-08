local rain = {}

local raindrop = love.graphics.newImage("assets/raindrop.png")
local rain_system = love.graphics.newParticleSystem(raindrop, 1000)

function rain:load()
    rain_system:setSizes(0.7,0.5,0.3)
    rain_system:setParticleLifetime(2,7)
    rain_system:setAreaSpread("uniform",window_width,0)
    rain_system:setColors(255, 255, 255, 50, 255, 255, 255, 0)
    rain_system:setPosition(window_width, window_height+20)
    rain_system:setLinearAcceleration( -20, -50, 20, -100)
end  

function rain:draw()
    love.graphics.draw(rain_system)
end

function rain:emit(n)
    rain_system:emit(n)
end

function rain:update(dt)
    rain_system:update(dt)
end

return rain