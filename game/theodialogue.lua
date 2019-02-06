local theodialogue = {}

Gamestate = require("libs/gamestate")

local Moan = require("libs/Moan")
local feather = require("feather")
local avatar = love.graphics.newImage("assets/Theo.png")


current_audio = nil

function theodialogue:enter()
  love.graphics.setBackgroundColor( 28, 78, 104 )
  Moan.font = love.graphics.newFont("assets/Pixel UniCode.ttf", 32)
  
  Moan.setSpeed('medium')
  
  Moan.new(setText("You're having a panic attack.", 1))
  Moan.new(setText("Stay with me here.", 2))
  Moan.new(setText("My grandpa taught me a trick for this.", 3))
  Moan.new(setText("Close your eyes.", 4))
  Moan.new(setText("Picture a feather floating in front of you.", 5))
  Moan.new(setText("See it?", 6))
  Moan.new(setText("Okay.", 7))
  Moan.new(setText("Your breathing keeps that feather floating.", 8))
  Moan.new(setText("Just breathe slow and steady, in and out.", 9, {onstart=function() playDialogue(9) end, image=avatar, oncomplete=function() Gamestate.switch(feather) end}))
  
end

function theodialogue:update(dt)
  Moan.update(dt)
end

function theodialogue:draw()
  Moan.draw()
end

function theodialogue:keyreleased(key)
  Moan.keyreleased(key)
end

function playDialogue(n)
  if current_audio then
     love.audio.stop(current_audio)
  end
  current_audio = love.audio.newSource("assets/theo"..n..".wav", "static")
  love.audio.play(current_audio)
end

function setText(text, n, specialconfig)
  local title = {"Theo", {0,191,255}}
  local message = {text}
  local config = specialconfig or {image=avatar, onstart=function() playDialogue(n) end}
  return title, message, config
end

return theodialogue