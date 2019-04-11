$(document).ready(function() {
    showMainMenu();
    document.getElementById("game-over").style.display = "none";
    document.getElementById("game-paused").style.display = "none";
})

function showMainMenu() {
    document.getElementById("game-menu").style.display = "block";
    document.getElementById("game-about").style.display = "none";
    document.getElementById("game-rules").style.display = "none";
    document.getElementById("game-over").style.display = "none";
}

function showGameOver() {
    document.getElementById("game-over").style.display = "block";
    document.getElementById("game-menu").style.display = "none";
}

function showAbout() {
    document.getElementById("game-about").style.display = "block";
    document.getElementById("game-rules").style.display = "none";
}

function showRules() {
    document.getElementById("game-rules").style.display = "block";
    document.getElementById("game-about").style.display = "none";
}

function newGame() {
    document.getElementById("game-over").style.display = "none";
    document.getElementById("game-menu").style.display = "none";
    document.getElementById("game-about").style.display = "none";
    document.getElementById("game-rules").style.display = "none";
    setScore(0);
    document.getElementById("game-canvas").style.display = "block";
    
    
    var THEGAMELOOP;
    var paused = false;
    
    /* Initialize new game */
    var game = new Game(
        randomTetromino(),
        generateEmptyGrid(10,20),
        false
    );
    
    /* draw initial game positions */
    game.draw();
    
    /* run game loop */
    THEGAMELOOP = setInterval(gameLoop, game.speed);
    
    
    /* game loop */
    function gameLoop() {
        
        document.addEventListener("keydown", checkWhichKey)
        
        var clonedGame = game.clone();
        clonedGame.active = clonedGame.active.moveDown();
        if(!clonedGame.hasCollisions()) {
            game.active = game.active.moveDown();
            game.draw();
        } else {
            // Move Tetromino to grid
            for(var i=0; i<game.active.getTruthyCoords().length; i++) {
                var cell = game.active.getTruthyCoords()[i];
                game.grid[cell.col][cell.row] = game.active.colour;
                game.draw();
            }
            game.active = randomTetromino();

            /* IF NEW TETROMINO HAS COLLISIONS, THEN GAME OVER! */
            if(game.hasCollisions()) {
                game.gameOver = true;
                //game.speed = 1000;
                clearInterval(THEGAMELOOP);
                document.removeEventListener("keydown", checkWhichKey);
                game.grid = generateEmptyGrid(10,20);
                game.active.shape = generateEmptyGrid(3,3);
                game.draw();
                showGameOver();
                
            } else {
                addToScore(10);
                game.scanLines();
                game.draw();
            }

            
        }
        
        var currentScore = getScore();
        if(currentScore > 1000) {
            game.speed = 900;
        }
        if(currentScore > 2000) {
            game.speed = 800;
        }
        if(currentScore > 3000) {
            game.speed = 700;
        }
        if(currentScore > 4000) {
            game.speed = 600;
        }
        if(currentScore > 5000) {
            game.speed = 500;
        }
        if(currentScore > 6000) {
            game.speed = 400;
        }
        if(currentScore > 7000) {
            game.speed = 300;
        }
        if(currentScore > 8000) {
            game.speed = 200;
        }
        if(currentScore > 9000) {
            game.speed = 100;
        }
        if(currentScore > 10000) {
            game.speed = 80;
        }
        
        clearInterval(THEGAMELOOP);
        THEGAMELOOP = setInterval(gameLoop, game.speed);
        
    }
    
    
    
    
    /* respond to specific keypress */
    function checkWhichKey(e) {
                
        switch(e.keyCode) {
                
            case 80:
                // 'P' key
                if(paused) {
                    paused = false;
                    clearInterval(THEGAMELOOP);
                    THEGAMELOOP = setInterval(gameLoop, game.speed);
                    document.getElementById("game-paused").style.display = "none";
                } else {
                    paused = true;
                    clearInterval(THEGAMELOOP);
                    document.getElementById("game-paused").style.display = "block";
                }
                
                e.preventDefault();
                break;
                
            case 37: // Left Key
                var clonedGame = game.clone();
                clonedGame.active = clonedGame.active.moveLeft();
                if(!clonedGame.hasCollisions()) {
                    game.active = game.active.moveLeft();
                    game.draw();
                }
                e.preventDefault();
                break;
                
            case 38: // Up Key
                var clonedGame = game.clone();
                clonedGame.active = clonedGame.active.rotate();
                if(!clonedGame.hasCollisions()) {
                    game.active = game.active.rotate();
                    game.draw();
                } 
                
                e.preventDefault();
                break;
                
            case 39: // Right Key
                var clonedGame = game.clone();
                clonedGame.active = clonedGame.active.moveRight();
                if(!clonedGame.hasCollisions()) {
                    game.active = game.active.moveRight();
                    game.draw();
                }
                e.preventDefault();
                break;
                
            case 40: // Down Key
                var clonedGame = game.clone();
                clonedGame.active = clonedGame.active.moveDown();
                if(!clonedGame.hasCollisions()) {
                    game.active = game.active.moveDown();
                    game.draw();
                } else {
                    // Move Tetromino to grid
                    for(var i=0; i<game.active.getTruthyCoords().length; i++) {
                        var cell = game.active.getTruthyCoords()[i];
                        game.grid[cell.col][cell.row] = game.active.colour;
                        game.draw();
                    }
                    game.active = randomTetromino();
                    
                    /* IF NEW TETROMINO HAS COLLISIONS, THEN GAME OVER! */
                    if(game.hasCollisions()) {
                        game.gameOver = true;
                        //game.speed = 1000;
                        clearInterval(THEGAMELOOP);
                        document.removeEventListener("keydown", checkWhichKey);
                        game.grid = generateEmptyGrid(10,20);
                        game.active.shape = generateEmptyGrid(3,3);
                        game.draw();
                        showGameOver();
                    }
                    
                    addToScore(10);
                    game.scanLines();
                    console.log(game.speed);
                    game.draw();
                }
                e.preventDefault();
                break;
            default:
                break;
        }
    }

    
    
} /* end of newGame() function */


function Position(col, row) {
    this.col = col;
    this.row = row;
}

Position.prototype.clone = function() {
    return new Position(this.col, this.row);
}

function Tetromino(position, shape, colour) {
    this.position = position;
    this.shape = shape;
    this.colour = colour;
}

Tetromino.prototype.hasCollisions = function() {
    var result = false;
    var list = this.getTruthyCoords();
    
    for(var i=0; i<list.length; i++) {
        if((list[i].col < 0) || (list[i].col > 9) || (list[i].row > 19)) {
            result = true;
        }
    }
    
    return result;
}

Tetromino.prototype.clone = function() {
    return new Tetromino(
        this.position.clone(),
        this.shape,
        this.colour
    );
}

Tetromino.prototype.getTruthyCoords = function() {
    var coords = new Array();
    
    for(var i=0; i<this.shape.length; i++) {
        for(var j=0; j<this.shape[i].length; j++) {
            if(this.shape[i][j] == 1) {
                coords.push(new Position(
                    i + this.position.col,
                    j + this.position.row
                ));
            }
        }
    }
    
    return coords;
};

Tetromino.prototype.moveDown = function() {
    var clonedTetromino = this.clone();
    clonedTetromino.position.row++;
    return clonedTetromino;
}

Tetromino.prototype.moveLeft = function() {
    var clonedTetromino = this.clone();
    clonedTetromino.position.col--;
    return clonedTetromino;
}

Tetromino.prototype.moveRight = function() {
    var clonedTetromino = this.clone();
    clonedTetromino.position.col++;
    return clonedTetromino;
}

Tetromino.prototype.rotate = function() {
    var clonedTetromino = this.clone();
    clonedTetromino.shape = transpose(clonedTetromino.shape);
    clonedTetromino.shape = flipHorizontal(clonedTetromino.shape);
    return clonedTetromino;
}

function randNum(min,max) {
    return Math.floor(Math.random() * ((max-min)+1)) + min;
}

function randomTetromino() {
    var shapes = [T,S,J,O,I,Z];
    var colours = ["red","yellow","orange","green","blue","purple"];
    
    return new Tetromino(
        new Position(randNum(0,7),0),
        shapes[randNum(0,5)],
        colours[randNum(0,5)]
    );
}

var T = [
    [0,1,0],
    [1,1,0],
    [0,1,0]
];

var S = [
    [0,1,0],
    [1,1,0],
    [1,0,0]
];

var J = [
    [0,0,1],
    [1,1,1],
    [0,0,0]
];

var O = [
    [1,1],
    [1,1]
];

var I = [
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0]
];

var Z = [
    [1,0,0],
    [1,1,0],
    [0,1,0]
];

function Game(active, grid, gameOver) {
    this.active = active;
    this.grid = grid;
    this.gameOver = false;
    this.speed = 1000;
}

Game.prototype.draw = function() {
    var truthy = this.active.getTruthyCoords();
    
    var canvas = document.getElementById("game-canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = this.active.colour;
    
    // Draw Active Tetromino
    for(var i=0; i<truthy.length; i++) {
        var col = truthy[i].col;
        var row = truthy[i].row;
        ctx.fillRect(col*30, row*30, 30, 30);
    }
    
    // Draw grid
    for(i=0; i<this.grid.length; i++) {
        for(var j=0; j<this.grid[i].length; j++) {
            if(this.grid[i][j] != 0) {
                ctx.fillStyle = this.grid[i][j];
                ctx.fillRect(i*30,j*30,30,30);
            }
        }
    }
    
}

/* Scan all rows and clear any completed */
Game.prototype.scanLines = function() {
    // i=rows,   j=cols
    var truthyRows;
    
    for(var i=0; i<20; i++) {
        truthyRows = new Array(10);
        for(var j=0; j<10; j++) {
            if(this.grid[j][i]!=0) {
                truthyRows[j]=1;
            } else {
                truthyRows[j]=0;
            }
        }
        if(!truthyRows.includes(0)) {
            this.shiftFromRow(i);
            addToScore(100);
        }
        
    }
    
}

Game.prototype.shiftFromRow = function(maxRow) {
    for(var i=maxRow; i>=0; i--) {
        for(var j=0; j<10; j++) {
            if(i==0) {
                this.grid[j][i] == 0;
            } else {
                this.grid[j][i] = this.grid[j][i-1];
            }
            
        }
    }
}

Game.prototype.clone = function() {
    return new Game(
        this.active.clone(),
        this.grid,
        this.gameOver
    );
}

Game.prototype.hasCollisions = function() {
    var truth = false;
    
    // Check if Tetromino collides with occupied grid cells
    var truthyCoords = this.active.getTruthyCoords();
    for(var i=0; i<this.grid.length; i++) {
        for(var j=0; j<this.grid[i].length; j++) {
            if(this.grid[i][j] != 0) {
                for(var k=0; k<truthyCoords.length; k++) {
                    if(i==truthyCoords[k].col && j==truthyCoords[k].row) {
                        truth = true;
                    }
                }
            }
        }
    }
    
    // Check if Tetromino collides with walls
    if(this.active.hasCollisions()) {
        truth = true;
    }
    
    return truth;
}

function generateEmptyGrid(col, row) {
    var grid = new Array(col);
    for(var i=0; i<col; i++) {
        grid[i] = new Array(row);
        for(var j=0; j<grid[i].length; j++) {
            grid[i][j] = 0;
        }
    }
    
    return grid;
}

function getScore() {
    var textScore = document.getElementById("score-value").innerHTML;
    var numberScore = parseInt(textScore, 10);
    return numberScore;
}

function setScore(num) {
    document.getElementById("score-value").innerHTML = num;
}

/* adds num to score value */
function addToScore(num) {
    var numberScore = getScore()
    setScore(numberScore + num)
}

function cloneMatrix(matrix) {
    var newMatrix = generateEmptyGrid(matrix.length, matrix.length);
    
    for(var i=0; i<matrix.length; i++) {
        for(var j=0; j<matrix[i].length; j++) {
            newMatrix[i][j] = matrix[i][j];
        }
    }
    
    return newMatrix;
}

function transpose(matrix) {
    var newMatrix = generateEmptyGrid(matrix.length, matrix.length);
    
    for(var i=0; i<matrix.length; i++) {
        for(var j=0; j<matrix[i].length; j++) {
            if(i==j) {
                newMatrix[i][j] = matrix[i][j];
            } else {
                newMatrix[j][i] = matrix[i][j];
            }
        }
    }
    
    return newMatrix;
}

function flipHorizontal(matrix) {
    var newMatrix = cloneMatrix(matrix);
    
    /* Not needed for 'O' Tetromino */
    //if(matrix.length==2) {}
    
    if(matrix.length==3) {
        for(var i=0; i<matrix.length; i++) {
            newMatrix[1][i] = matrix[1][i];
            newMatrix[0][i] = matrix[2][i];
            newMatrix[2][i] = matrix[0][i];            
        }
    }
    
    /* Game feels better without this */
    /*if(matrix.length==4) {
        for(var i=0; i<matrix.length; i++) {
            newMatrix[0][i] = matrix[3][i];
            newMatrix[1][i] = matrix[2][i];
            newMatrix[3][i] = matrix[0][i];
            newMatrix[2][i] = matrix[1][i];
        }
    }*/
    
    return newMatrix;
}