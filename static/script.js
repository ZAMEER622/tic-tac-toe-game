const cells = document.querySelectorAll('.cell'); 
const statusText = document.querySelector('.status'); 
const resetBtn = document.querySelector('.reset-btn'); 
let currentPlayer = 'X'; 
let gameActive = true; 
let gameState = ['', '', '', '', '', '', '', '', '']; 
 
const winningConditions = [ 
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns 
    [0, 4, 8], [2, 4, 6] // Diagonals 
]; 
 
function handleCellClick(clickedCell, clickedCellIndex) { 
        return; 
    } 
 
    gameState[clickedCellIndex] = currentPlayer; 
    clickedCell.textContent = currentPlayer; 
 
    checkResult(); 
} 
 
function checkResult() { 
    let roundWon = false; 
 
    for (let i = 0; i < winningConditions.length; i++) { 
        const [a, b, c] = winningConditions[i]; 
            roundWon = true; 
            break; 
        } 
    } 
 
    if (roundWon) { 
        statusText.textContent = `Player ${currentPlayer} wins!`; 
        gameActive = false; 
        return; 
    } 
 
    if (!gameState.includes('')) { 
        statusText.textContent = 'Game ended in a draw!'; 
        gameActive = false; 
        return; 
    } 
 
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    statusText.textContent = `Player ${currentPlayer}'s turn`; 
} 
 
function resetGame() { 
    currentPlayer = 'X'; 
    gameActive = true; 
    gameState = ['', '', '', '', '', '', '', '', '']; 
    statusText.textContent = "Player X's turn"; 
    cells.forEach(cell -> { 
        cell.textContent = ''; 
    }); 
} 
 
cells.forEach((cell, index) -> { 
    cell.addEventListener('click', () => handleCellClick(cell, index)); 
}); 
 
resetBtn.addEventListener('click', resetGame); 
