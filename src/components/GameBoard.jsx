import { gameLogAtom, gameBoardAtom, gameStartUseRefAtom, gameStartedAtom, roundWinnerAtom } from '../atom';
import { useAtom, useAtomValue } from 'jotai';
import { useRef } from 'react';

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

export default function GameBoard(){
    const [log,setGameLog] = useAtom(gameLogAtom);
    const [board,setBoard] = useAtom(gameBoardAtom);
    const gameStarted = useAtomValue(gameStartedAtom);
    const gameStartUseRef = useAtomValue(gameStartUseRefAtom);
    const warningText = useRef(null);
    const [roundWinner,setRoundWinner] = useAtom(roundWinnerAtom);

    const activePlayer = log.x.active ? log.x.symbol : log.o.symbol;
    const inActivePlayer = log.x.active ? log.o.symbol : log.x.symbol;

    const handleWinner = (result) => {
        setRoundWinner(a => {
            const n = [...a]

            n.push(result)

            return n;
        })
    }

    const handleButtonClick = function(rowIndex,colIndex){
        if(board[rowIndex][[colIndex]] != null) return;

        if(!gameStarted) {
            if(warningText.current !== null) warningText.current.style.display=''
            if(gameStartUseRef.current !== null) gameStartUseRef.current.className+= ' animate-btn'
            // console.log('Game is not started yet!',gameStartUseRef.current.className)
            return;
        }
        
        setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[rowIndex][colIndex] = activePlayer;
            
            return newBoard;
        });

        setGameLog(prevLog => {
            const newLog = {...prevLog};
            const turn = rowCoordinates[rowIndex]+colCoordinates[colIndex];
            newLog[activePlayer].turnLog.push(turn);
            newLog[activePlayer].winner = findWinner(newLog[activePlayer].turnLog);
            
            if((newLog[activePlayer].turnLog.length + newLog[inActivePlayer].turnLog.length) < 9 && !newLog[activePlayer].winner){
                newLog[activePlayer].active = false;
                newLog[inActivePlayer].active = true;
            }else if(!newLog[activePlayer].winner && !newLog[inActivePlayer].winner){
                newLog.draw = true;
                handleWinner('d');
            }

            if(newLog[activePlayer].winner) handleWinner(activePlayer)

            return newLog;
        })
    }

    return (
        <div id="game-board-wrap">

            <div ref={warningText} style={{display:"none"}} className="warning-notice absolute -top-28 w-full">
                <div role="alert" className="alert alert-error alert-outline border-0" hidden={gameStarted}>
                    <span className='text-2xl text-center text-red-500'>Game not started yet!</span>
                </div>
                
            </div>

            <div id="game-status" className="absolute -top-28 w-full" hidden={!gameStarted}>
                <div className="round-status text-2xl">Round {roundWinner.length + 1}</div>
                {/* <div className="round-status text-2xl">Round {roundWinner.length + 1}</div> */}
            </div>

            <ol id="game-board">            
                {board.map((row, rowIndex) => 
                    <li key={rowIndex}>
                        <ol>
                        {row.map((playerSymbol, colIndex) => 
                            <li key={colIndex}>
                                <button onClick={() => handleButtonClick(rowIndex,colIndex)}><span>{playerSymbol}</span></button>
                            </li>
                        )}   
                        </ol>
                    </li>
                )}
            </ol>

        </div>
    )
}