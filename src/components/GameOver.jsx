import { useSetAtom } from 'jotai';
import { defaultPlayer, gameLogAtom, gameBoardAtom, initialGameBoard } from '../atom';

export default function GameOver({winner}) {
    const message = (typeof winner === 'boolean') ? 'Draw!' : winner.name + ' won!';
    const setGameLog = useSetAtom(gameLogAtom);
    const resetGameBoard = useSetAtom(gameBoardAtom);

    const handleRematch = function(){        
        resetGameBoard([...initialGameBoard.map(v => [...v])]);

        setGameLog(prevLog => {
          const newSet = {'x':{...defaultPlayer.x},'o':{...defaultPlayer.o},'draw':false};
            newSet.x.name = prevLog.x.name
            newSet.o.name = prevLog.o.name
            newSet.x.turnLog = []
            newSet.o.turnLog = []
          return newSet;
        })
    }

    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            <p>{message}</p>
            <p><button onClick={handleRematch}>Rematch!</button></p>
        </div>
    )
}