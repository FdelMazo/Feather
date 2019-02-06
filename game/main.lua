local Moan = require("libs/Moan")
local Dialogue = require("libs/Dialogue")

function love.load()
  love.graphics.setBackgroundColor(154, 205, 237)
  Moan.font = love.graphics.newFont("assets/Pixel UniCode.ttf", 32)
  Moan.typeSound = love.audio.newSource("assets/typeSound.wav", "static")
  avatar = love.graphics.newImage("assets/Theo.png")
    
  Moan.new(
    {"Theo", {0,191,255}},
      Dialogue:speak(),
      {image=avatar}
    )
end

function love.update(dt)
  Moan.update(dt)
end

function love.draw()
  Moan.draw()
end

function love.keyreleased(key)
  Moan.keyreleased(key)
end