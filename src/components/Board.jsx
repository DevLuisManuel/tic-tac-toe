import {Square} from "./Square.jsx";
import {TURNS} from "../const/constants.js";
import {WinnerModal} from "./WinnerModal.jsx";

const Board = ({board,turn, resetGame,updateBoard,winner}) => {
    return (
        <main className="board">
            <h1>Tic Tac Toe</h1>
            <button onClick={resetGame}>Reset del Juego</button>
            <section className="game">
                {
                    board.map((_, index) => {
                        return (
                            <Square key={index} index={index} updateBoard={updateBoard}>
                                {board[index]}
                            </Square>
                        )
                    })
                }
            </section>
            <section className="turn">
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>
            <WinnerModal resetGame={resetGame} winner={winner}/>
        </main>
    )
}

export default Board;