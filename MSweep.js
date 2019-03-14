/*
NxN board
squares can be empty or mines
to the UI, squares can be hidden or visible
when you click on a mine, it's revealed and you lose the game
when you click an empty square, it's revealed and the number of adjacent (8-way) mines is displayed in it
when an empty square with 0 adjacent mines is revealed, the surrounding squares are also revealed.
you win when all non-mine squares are visible

*/

const square = (bomb) => ({bomb, isRevealed: false});

const makeBomb = (numBombs, bombCount) => {
    if(numBomb < bombCount) {
        if(Math.rand().round() === 1) {
            return true;
        }
    }
    return false;
}

const gameBoard = (size, bombCount) => {
    const gameBoard = [size];
    
    let numBombs = 0;
    for(let i = 0; i<size; i++) {
        gameBoard[i] = [size];
        for(let j = 0; j<size; j++) {
            gameBoard[i][j] = square(makeBomb(numBombs, bombCount));
        }
    }
    
    return gameBoard;
}

// [{bomb: true, isRevealed: false}]

const hasBomb = (gameBoard, x, y) => gameBoard[x][y].bomb;

class Game {
    gameBoard;
    revealedBoard;
    constructor(size, bombCount) {
        gameBoard = gameBoard(size, bombCount);
        revealedBoard = [size][size];
    }
    
    neighbors(x, y) { 
        // pretend this works   
    }
    
    countNeighboringBombs(x, y) {
        this.neighbors(x,y).reduce((count, neighbor) => {
            if(neighbor.bomb){
                return count + 1;
            }
            return count;
        }, 0);
    }

// in react use arrow ;)
    handleClick = (x, y) => {
        // return revealed pieces, or whole board if lost
        if(hasBomb(this.gameBoard, x,y)){
            return "you lost";
        }
            
        const checkRevealStack = [{x,y}];
        while(checkrevealStack.length > 0) {
            const currentSquare = checkRevealStack.pop();
            //reveal self
            this.gameboard[x][y].revealed = true;
            if(countNeighboringBombs(currentSquare.x, currentSquare.y) < 1) {
                // reveal all neighbours
                this.neighbors(x,y).forEach((neighbor) => {
                    if(!neighbor.isRevealed) {
                        checkRevealStack.push({neighbor.x, neighbor.y});
                    }
                });
            }
            
        });
    }
}
