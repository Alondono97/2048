function main(){
    let board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    
    board = generateNewTile(board)
    board = generateNewTile(board)

    console.log(board)

    document.body.addEventListener('keydown', function(event)
    {
        const keyPress = event.key;
        if(keyPress === "ArrowDown"){
            board = moveTilesDown(board)
        } else if( keyPress === "ArrowUp"){
            board = moveTilesUp(board)
        } else if(keyPress === "ArrowRight"){
            board = moveTilesRight(board)
        } else {
            board = moveTilesLeft(board)
        }

        board = generateNewTile(board)
        console.log(board)
        
    })

}

function generateNewTile(gameBoard){
    while(true){
        let i = Math.floor(Math.random() * 4);
        let j = Math.floor(Math.random() * 4);

        if(gameBoard[i][j] === 0){
            gameBoard[i][j] = 2;
            return gameBoard
        }
    }
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

main()
