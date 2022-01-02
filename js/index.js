function main(){
    let board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    
    board = generateNewTile(board)
    board = generateNewTile(board)

    renderBoard(board)
    playGame(board)
}

function playGame(board){
    document.body.addEventListener('keydown', function(event){
        
        const keyPress = event.key;
        oldBoard = JSON.parse(JSON.stringify(board));

        if(keyPress === "ArrowDown"){
            board = moveTilesDown(board)
        } else if( keyPress === "ArrowUp"){
            board = moveTilesUp(board)
        } else if(keyPress === "ArrowRight"){
            board = moveTilesRight(board)
        } else if(keyPress === "ArrowLeft"){
            board = moveTilesLeft(board)
        }

        if(boardHasChanged(board, oldBoard)){
            board = generateNewTile(board)
            renderBoard(board)
        } else if(boardIsFull(board) && !hasAdjacentTiles('all', board)){
            document.getElementById("game-over").innerHTML = "Game Over!"
        }
                
    })
}

function generateNewTile(gameBoard){

    let r = Math.floor(Math.random() * 100)

    while(!boardIsFull(gameBoard)){
        let i = Math.floor(Math.random() * 4);
        let j = Math.floor(Math.random() * 4);

        if(gameBoard[i][j] === 0){
            if(r > 4){
                gameBoard[i][j] = 2;
            } else {
                gameBoard[i][j] = 4;
            }

            return gameBoard
        }
    }

    return gameBoard
}

function moveTilesDown(gameBoard){

    // Move All tiles DOWN row by row, iterating starting from the TOP, don't combine numbers
    for(let i = 0; i < 2; i++){
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 4; col++){
                if(gameBoard[row][col] > 0 && gameBoard[row+1][col] === 0){
                    gameBoard[row+1][col] = gameBoard[row][col];
                    gameBoard[row][col] = 0;
                }
            }
        }

        //Move all tiles DOWN row by row, iterating starting from the bottom, don't combine numbers
        for(let row = 3; row > 0; row--){
            for(let col = 0; col < 4; col++){
                if(gameBoard[row][col] === 0 && gameBoard[row-1][col] > 0){
                    gameBoard[row][col] = gameBoard[row-1][col];
                    gameBoard[row-1][col] = 0;
                }
            }
        }
    }

    // combine any equal adjacent numbers, starting from bottom
    for(let row = 3; row > 0; row--){
        for(let col = 0; col < 4; col++){
            if(gameBoard[row][col] === gameBoard[row-1][col]){
                gameBoard[row][col] += gameBoard[row-1][col];
                gameBoard[row-1][col] = 0;
            }
        }
    }

    // move all tiles down row by row, iterating starting from the bottom, don't combine numbers
    for(let row = 3; row > 0; row--){
        for(let col = 0; col < 4; col++){
            if(gameBoard[row][col] === 0 && gameBoard[row-1][col] > 0){
                gameBoard[row][col] = gameBoard[row-1][col];
                gameBoard[row-1][col] = 0;
            }
        }
    }

    return gameBoard
}

function moveTilesUp(gameBoard){
    
    // TODO: Do we have to run this twice?
    for(let i = 0; i < 2; i++){
        for(let row = 3; row > 0; row--){
            for(let col = 0; col < 4; col++){
                if(gameBoard[row][col] > 0 && gameBoard[row-1][col] === 0){
                    gameBoard[row-1][col] = gameBoard[row][col];
                    gameBoard[row][col] = 0;
                }
            }
        }

        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 4; col++){
                if(gameBoard[row][col] === 0 && gameBoard[row+1][col] > 0){
                    gameBoard[row][col] = gameBoard[row+1][col];
                    gameBoard[row+1][col] = 0;
                }
            }
        }
    }

    // combine any equal, adjacent numbers, starting from top
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 4; col++){
            if(gameBoard[row][col] === gameBoard[row+1][col]){
                gameBoard[row][col] += gameBoard[row+1][col];
                gameBoard[row+1][col] = 0;
            }
        }
    }

    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 4; col++){
            if(gameBoard[row][col] === 0 && gameBoard[row+1][col] > 0){
                gameBoard[row][col] = gameBoard[row+1][col];
                gameBoard[row+1][col] = 0;
            }
        }
    }

    return gameBoard
}

function moveTilesRight(gameBoard){
    for(let i = 0; i < 2; i++){
        for(let row = 0; row < 4; row++){
            for(let col = 0; col < 3; col++){
                if(gameBoard[row][col] > 0 && gameBoard[row][col+1] === 0){
                    gameBoard[row][col+1] = gameBoard[row][col]
                    gameBoard[row][col] = 0
                }
            }
        }

        for(let row = 0; row < 4; row++){
            for(let col = 3; col > 0; col--){
                if(gameBoard[row][col] === 0 && gameBoard[row][col-1] > 0){
                    gameBoard[row][col] = gameBoard[row][col-1];
                    gameBoard[row][col-1] = 0;
                }
            }
        }
    }

    for(let row = 0; row < 4; row++){
        for(let col = 3; col > 0; col--){
            if(gameBoard[row][col] === gameBoard[row][col-1]){
                gameBoard[row][col] += gameBoard[row][col-1];
                gameBoard[row][col-1] = 0;
            }
        }
    }

    for(let row = 0; row < 4; row++){
        for(let col = 3; col > 0; col--){
            if(gameBoard[row][col] === 0 && gameBoard[row][col-1] > 0){
                gameBoard[row][col] = gameBoard[row][col-1];
                gameBoard[row][col-1] = 0;
            }
        }
    }

    return gameBoard
}

function moveTilesLeft(gameBoard){
    for(let i = 0; i < 2; i++){
        for(let row = 0; row < 4; row++){
            for(let col = 3; col > 0; col--){
                if(gameBoard[row][col] > 0 && gameBoard[row][col-1] === 0){
                    gameBoard[row][col-1] = gameBoard[row][col];
                    gameBoard[row][col] = 0;
                }
            }
        }

        for(let row = 0; row < 4; row++){
            for(let col = 0; col < 3; col++){
                if(gameBoard[row][col] === 0 && gameBoard[row][col+1] > 0){
                    gameBoard[row][col] = gameBoard[row][col+1]
                    gameBoard[row][col+1] = 0
                }
            }
        }
    }

    for(let row = 0; row < 4; row++){
        for(let col = 0; col < 3; col++){
            if(gameBoard[row][col] ===  gameBoard[row][col+1]){
                gameBoard[row][col] += gameBoard[row][col+1]
                gameBoard[row][col+1] = 0
            }
        }
    }

    for(let row = 0; row < 4; row++){
        for(let col = 0; col < 3; col++){
            if(gameBoard[row][col] === 0 && gameBoard[row][col+1] > 0){
                gameBoard[row][col] = gameBoard[row][col+1]
                gameBoard[row][col+1] = 0
            }
        }
    }

    return gameBoard
}

function renderBoard(gameBoard){

    gameBoardElement = document.getElementById("game-board");

    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            let index = i * 4 + j

        
            if(gameBoard[i][j] === 0) {
                gameBoardElement.children[index].children[0].innerHTML = ""
                gameBoardElement.children[index].style.backgroundColor = "#C2B8A3";
            } else if(gameBoard[i][j] > 0) {
                gameBoardElement.children[index].children[0].innerHTML = gameBoard[i][j]
                gameBoardElement.children[index].style.backgroundColor = "#FEF7DC";

                if(gameBoard[i][j] === 4){
                    gameBoardElement.children[index].style.backgroundColor = "#EDCFA9";
                } else if(gameBoard[i][j] === 8){
                    gameBoardElement.children[index].style.backgroundColor = "#E89F71";
                } else if(gameBoard[i][j] === 16){
                    gameBoardElement.children[index].style.backgroundColor = "#D57149";
                } else if(gameBoard[i][j] === 32){
                    gameBoardElement.children[index].style.backgroundColor = "#E99497"
                } else if(gameBoard[i][j] === 64){
                    gameBoardElement.children[index].style.backgroundColor = "#FFC074"
                } else if(gameBoard[i][j] >= 128){
                    gameBoardElement.children[index].style.backgroundColor = "#FFC107"
                    
                    if(gameBoard[i][j] % 2048 === 0){
                        document.getElementById("game-over").innerHTML = "You Won!"
                        gameBoardElement.children[index].style.backgroundColor = "#7CD1B8"

                    }
                } 
            }
                    
                
        }
    }

}

function boardIsFull(gameBoard){
    for(const row of gameBoard){
        for(const col of row){
            if(col === 0){
                return false;
            }
        }
    }

    return true;
}

function hasAdjacentTiles(direction, gameBoard){
    if(direction === "right" || direction === "left" || direction === "all"){
        for(let row = 0; row < 4; row++){
            for(let col = 0; col < 3; col++){
                if(gameBoard[row][col] > 0 && gameBoard[row][col] === gameBoard[row][col+1]){
                    return true;
                }
            }
        }
    }

    if(direction === "up" || direction === "down" || direction === "all"){
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 4; col++){
                if(gameBoard[row][col] > 0 && gameBoard[row][col] === gameBoard[row+1][col]){
                    return true
                }
            }
        }
    }

    return false
}

function boardHasChanged(newBoard, oldBoard){
    for(let row = 0; row < 4; row++){
        for(let col = 0; col < 4; col++){
            if(newBoard[row][col] !== oldBoard[row][col]){
                return true;
            }
        }
    }

    return false;
}

main()
