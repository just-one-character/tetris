# tetris
A simple tetris game using Vanilla Javascript.

I used a series of Functions to abstract the smaller functionality into more managable pieces. Prototyping allowed extensions to the base functions for additional methods.

Game logic control derived by focusing on one key function called Game() and all the other functions provide the smaller machinery to calculate positions, collisions, and objects used mid-game.

HTML Canvas with Javascript calls provided a means to draw the game on the webpage.

Main game loop runs on setInterval() which is probably not ideal but provides a basic looping mechanism with an updatable tempo.

The most challenging parts were:
1. the logic to rotate the Tetromino. I had to brush up on my Matrix maths for this one!
2. the detect collisions functionality. This had to combine both the collision detection of the Tetromino to the perimeter of the game area as well as with the background grid. Sounds simple but with my architecture of functions it proved harder.
