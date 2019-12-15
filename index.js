/*
* Robby La Tourette 
*/

/**************
    Variables
***************/
const n = 3;
const winCondition = 3;
const gameBoard = Array.from({length: n}, () =>
                  Array.from({length: n}, () => 0));
var   player = 1;

/**************
    FUNCTIONS
***************/
function resetGame() 
{
    const boxes = document.querySelectorAll('.box');

    for (let i = 0; i < boxes.length; i++) 
    {
        boxes[i].textContent = '';
        boxes[i].addEventListener('click', boxClick, false);
    }

    player = 1;
    updateMessage(player);
    gameBoard.forEach(arr => arr.fill(0));
}
//========================================================================
function boxClick(box) 
{
    play(box.target.id);
}
//========================================================================
function play(boxId) 
{
    const box = document.getElementById(boxId);
    if (box.textContent === '') 
    {
        const pattern = player === 1 ? 'O' : 'X';
        box.textContent = pattern;
        const row = parseInt(boxId.charAt(1));
        const col = parseInt(boxId.charAt(2));
        writeBoard(row, col);
        checkWin(row, col);
        switchTurn();
    }
}
//========================================================================
function writeBoard(row, col) 
{
    gameBoard[row][col] = player;
}
//========================================================================
function switchTurn() 
{
    if (player === 1) 
    {
        player = -1;
    } 

    else 
    {
        player = 1;
    }

    updateMessage(player);
}
//========================================================================
function updateMessage(player)
{
    var turn = document.getElementById("turn");
    
    if(player == 1)
    {
        turn.innerHTML = "O's turn";
    }

    else
    {
        turn.innerHTML = "X's turn";
    }

}
//========================================================================
function checkWin(row, col) 
{
    let winner = null;
    //check win
    const state = gameState(gameBoard, player, row, col);
    if (state) 
    {
        winner = player === 1 ? 'O' : 'X';
        endGame(winner);
    } 
    
    else if (state === null) 
    {
        endGame(null);
    }
}
//========================================================================
function gameState(board, player, row, col) 
{
    let diag1 = 0;
    let diag2 = 0;
    
    if (row === undefined && col === undefined) 
    {
        for (let i = 0; i < n; i++) 
        {
            let ver = 0;
            let hor = 0;
            for (let j = 0; j < n; j++) 
            {
                ver += board[j][i];
                hor += board[i][j];
            }

            if (ver === player * winCondition || hor === player * winCondition) 
            {
                return true;
            }
        }
        for (let i = 0; i < n; i++) 
        {
            //check diagonal
            diag1 += board[i][i];
            diag2 += board[i][n - 1 - i];
        }

        if (diag1 === player * winCondition || diag2 === player * winCondition) 
        {
            return true;
        } 

        else if (board.every(arr => arr.every(n => n !== 0))) 
        {
            return null;
        } 

        else 
        {
            return false;
        }
    } 
    
    else 
    {
        // check vertical
        // check horizontal
        let ver = 0;
        let hor = 0;
        for (let i = 0; i < n; i++) 
        {
            ver += board[i][col];
            hor += board[row][i];
            //check diagonal
            diag1 += board[i][i];
            diag2 += board[i][n - 1 - i];
        }

        if (ver === player * winCondition || hor === player * winCondition 
            || diag1 === player * winCondition || diag2 === player * winCondition) 
        {
            return true;
        } 
        
        else if (board.every(arr => arr.every(n => n !== 0))) 
        {
            return null;
        } 

        else 
        {
            return false;
        }
    }
}
//========================================================================
function endGame(winner) 
{
    const boxes = document.querySelectorAll('.box');

    for (let i = 0; i < boxes.length; i++) 
    {
        boxes[i].removeEventListener('click', boxClick);
    }

    if (winner !== null) 
    {
       alert(`${winner} WON!\n\nPress restart to play again`);
    }

    else 
    {
      alert(`It's a tie\n\nPress restart to play again`);
    }
}
//========================================================================

resetGame();
