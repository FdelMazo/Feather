local theodialogue = {}

local Moan = require("libs/Moan")

local avatar = love.graphics.newImage("assets/Theo.png")
local alphadown, alphaup = 255, 0
local fadeout = false
local show_feather = false
local current_audio = nil

function theodialogue:enter()
  love.graphics.setColor(255,255,255,255)
  love.graphics.setBackgroundColor( 0,0,0 )
  
  Moan.font = love.graphics.newFont("assets/Pixel UniCode.ttf", 32)
  Moan.setSpeed('medium')
  
  Moan.new( {"Theo", {0,191,255}}, "You're having a panic attack." , {image=avatar, onstart=function() playDialogue(1) end} )
  Moan.new( {"Theo", {0,191,255}}, "Stay with me here." , {image=avatar, onstart=function() playDialogue(2) end} )
  Moan.new( {"Theo", {0,191,255}}, "My grandpa taught me a trick for this." , {image=avatar, onstart=function() playDialogue(3) end} )
  Moan.new( {"Theo", {0,191,255}}, "Close your eyes." , {onstart=function() playDialogue(4) ; fadeout = true end, image=avatar} )
  Moan.new( {"Theo", {0,191,255}}, "Picture a feather floating in front of you." , {image=avatar, onstart=function() playDialogue(5) ; show_feather = true end} )
  Moan.new( {"Theo", {0,191,255}}, "See it?" , {image=avatar, onstart=function() playDialogue(6) end} )
  Moan.new( {}, "Okay." , {image=avatar, onstart=function() playDialogue(7) end} )
  Moan.new( {}, "Your breathing keeps that feather floating.", {onstart=function() playDialogue(8) end} )
  Moan.new( {}, "Just breathe slow and steady, in and out." , { oncomplete=function() Gamestate.switch(breathing) end} )
end

function theodialogue:update(dt)
  Moan.update(dt)
  if fadeout then 
    alphadown = alphadown - (dt * (255 / 4))
  end
  
  if show_feather then
    alphaup = alphaup + (dt * (255 / 10))
  end
end

function theodialogue:draw()
  love.graphics.setColor(154, 205, 237,alphadown)
  love.graphics.rectangle("fill", 0, 0, 10000,10000 )

  love.graphics.setColor( 255,255,255,alphaup)
  love.graphics.draw(PARAMS.feather_image, PARAMS.feather_x_initial, PARAMS.feather_y_initial, 0, 1, 1, PARAMS.feather_width/2, PARAMS.feather_height/2 )

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

return theodialogue
