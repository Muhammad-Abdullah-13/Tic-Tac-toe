document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const message = document.querySelector(".message");
    const resetButton = document.getElementById("reset");
    const winnerModal = document.getElementById("winner-modal");
    const winnerText = document.getElementById("winner-text");
    const currentPlayerDisplay = document.getElementById("current-player");
    const playAgainButton = document.querySelector(".new-game-button"); // Get the "Play Again" button

    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }

        if (boardState.every((cell) => cell !== "")) {
            return "Tie";
        }

        return null;
    }

    function handleClick(event) {
        const cell = event.target;
        const index = parseInt(cell.dataset.index);

        if (boardState[index] === "" && !checkWinner()) {
            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);

            const winner = checkWinner();
            if (winner) {
                if (winner === "Tie") {
                    message.textContent = "It's a tie!";
                } else {
                    message.textContent = `Player ${winner} wins!`;
                    showWinnerModal(winner);
                }
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                currentPlayerDisplay.textContent = currentPlayer;
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function resetGame() {
        // Clear the boardState
        boardState = ["", "", "", "", "", "", "", "", ""];

        // Remove X and O classes from cells
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("X", "O");
        });

        // Reset the message and current player
        message.textContent = "Player X's turn";
        currentPlayer = "X";
        currentPlayerDisplay.textContent = currentPlayer;

        // Hide the winner modal
        winnerModal.style.display = "none";
    }

    function showWinnerModal(winner) {
        winnerText.textContent = `Player ${winner} wins!`;
        winnerModal.style.display = "flex";
    }

    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", handleClick);
            board.appendChild(cell);
        }
    }

    createBoard();
    resetButton.addEventListener("click", resetGame);

    // Add event listener to the "Play Again" button in the modal
    playAgainButton.addEventListener("click", () => {
        resetGame();
        winnerModal.style.display = "none"; // Hide the modal after starting a new game
    });
});
