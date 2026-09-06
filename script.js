const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", ""];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleCellClick(event) {
    const cell = event.target;
    const index = [...cells].indexOf(cell);
    if (board[index] !== "" || !gameActive) {
        return;
    }
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
}
function checkWinner() {
    let winner = null;
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winner = board[a];
            break;
        }
    }
    if (winner) {
        statusText.textContent = `Player ${winner} wins! 🎉`;
        gameActive = false;
        return;
    }
    if (!board.includes("")) {
        statusText.textContent = "It's a draw! 🤝";
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}
function restartGame() {
    board = ["", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = "";
    });
    statusText.textContent = "Player X's turn";
}
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});
restartButton.addEventListener("click", restartGame);