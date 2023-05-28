import {useState} from "react";
import confetti from "canvas-confetti"
import {TURNS} from "./const/constants.js"
import {checkWinnerFrom, checkEndGame} from "./logic/board.js"
import Board from "./components/Board.jsx";
import {resetGameStorage, saveGameToStorage} from "./logic/storage/index.js";

const App = () => {
    const [board, setBoard] = useState(() => {
        const boardFromLocalStorage = window.localStorage.getItem('board');
        return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
    });
    const [turn, setTurn] = useState(() => {
            const TurnFromLocalStorage = window.localStorage.getItem('turn');
            return TurnFromLocalStorage ?? TURNS.X
        }
    );
    const [winner, setWinner] = useState(null);

    const updateBoard = (index) => {
        if (board[index] || winner) return
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)
        saveGameToStorage({
            board: newBoard,
            turn: newTurn
        })
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
        resetGameStorage()
    }
    return (
        <Board winner={winner} updateBoard={updateBoard} turn={turn} board={board} resetGame={resetGame}/>
    )
}

export default App