import {useState} from "react";
import confetti from "canvas-confetti"
import {TURNS} from "./const/constants.js"
import {checkWinnerFrom, checkEndGame} from "./logic/board.js"
import Board from "./components/Board.jsx";

const App = () => {
    const [board, setBoard] = useState(
        Array(9).fill(null)
    );
    const [turn, setTurn] = useState(TURNS.X);
    const [winner, setWinner] = useState(null);

    const updateBoard = (index) => {
        // Verificamos si ya hay algo dentor del index
        if (board[index] || winner) return
        // Actualizamos el tablero
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)
        const newWinner = checkWinnerFrom(newBoard)
        if (newWinner) {
            setWinner(newWinner)
            confetti()
        } else if (checkEndGame(newBoard)) {
            setWinner(false)
        }
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
    }
    return (
        <Board winner={winner} updateBoard={updateBoard} turn={turn} board={board} resetGame={resetGame} />
    )
}

export default App