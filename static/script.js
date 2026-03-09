// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Game starting...');
    
    // Get elements
    const cells = document.querySelectorAll('.cell');
    const statusText = document.querySelector('.status');
    const resetBtn = document.querySelector('.reset-btn');
    
    // Game variables
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    
    // Winning combinations
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    // Add click events to cells
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function cellClick() {
            // Get cell index
            const index = this.getAttribute('data-index');
            
            // Check if move is valid
            if (!gameActive || gameState[index] !== '') {
                return;
            }
            
            // Make move
            gameState[index] = currentPlayer;
            this.textContent = currentPlayer;
            
            // Check for winner
            let winner = checkWinner();
            
            if (winner) {
                statusText.textContent = 'Player ' + winner + ' wins!';
                gameActive = false;
            } else if (isDraw()) {
                statusText.textContent = 'Game ended in a draw!';
                gameActive = false;
            } else {
                // Switch player
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                statusText.textContent = "Player " + currentPlayer + "'s turn";
            }
        });
    }
    
    // Function to check winner
    function checkWinner() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return null;
    }
    
    // Function to check draw
    function isDraw() {
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === '') {
                return false;
            }
        }
        return true;
    }
    
    // Reset button functionality
    resetBtn.addEventListener('click', function() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusText.textContent = "Player X's turn";
        
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = '';
        }
    });
    
    console.log('Game ready!');
});
