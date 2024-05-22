// import { useState } from "react";

const rowCoordinates = {
    '0': 'a',
    '1': 'b',
    '2': 'c'
}

const colCoordinates = {
    '0': '1',
    '1': '2',
    '2': '3'
}

const findWinner = function(turnLog){
    const winningCombination = [
        ['a1','a2','a3'],
        ['b1','b2','b3'],
        ['c1','c2','c3'],
        ['a1','b2','c3'],
        ['c1','b2','a3'],
        ['a1','b1','c1'],
        ['a2','b2','c2'],
        ['a3','b3','c3'],
    ];

    let winner = false

    winningCombination.map(c => {
        if(turnLog.filter(l => c.includes(l)).length == 3) winner = true;
    })

    return winner;
}

export default function GameBoard({onSelectBox,log,board}){
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);
    // console.log(board)
    const activePlayer = log.x.active ? log.x.symbol : log.o.symbol;
    const inActivePlayer = log.x.active ? log.o.symbol : log.x.symbol;

    const handleButtonClick = function(rowIndex,colIndex){
        if(board[rowIndex][[colIndex]] != null) return;        
        board[rowIndex][colIndex] = activePlayer;

        onSelectBox(prevLog => {
            const newLog = {...prevLog};
            const turn = rowCoordinates[rowIndex]+colCoordinates[colIndex];
            newLog[activePlayer].turnLog.push(turn);
            newLog[activePlayer].winner = findWinner(newLog[activePlayer].turnLog);
            
            if((newLog[activePlayer].turnLog.length + newLog[inActivePlayer].turnLog.length) < 9 && !newLog[activePlayer].winner){
                newLog[activePlayer].active = false;
                newLog[inActivePlayer].active = true;
            }else if(!newLog[activePlayer].winner && !newLog[inActivePlayer].winner){
                newLog.draw = true;
            }

            return newLog;
        })
    }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                       {row.map((playerSymbol, colIndex) => 
                         <li key={colIndex}>
                            <button onClick={() => handleButtonClick(rowIndex,colIndex)}>{playerSymbol}</button>
                         </li>
                       )}
                    </ol>
                </li>
            )}
        </ol>
    )
}