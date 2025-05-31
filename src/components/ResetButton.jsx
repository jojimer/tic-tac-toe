import { useSetAtom, useAtom } from 'jotai';
import { defaultPlayer, initialGameBoard, gameLogAtom, gameBoardAtom, gameStatusAtom, roundWinnerAtom } from '../atom';

export function ResetButton({children, classG}){  
    const setGameLog = useSetAtom(gameLogAtom);
    const resetGameBoard = useSetAtom(gameBoardAtom);
    const [{gameWinner, ch}, setGameStatus] = useAtom(gameStatusAtom);
    const resetRoundTable = useSetAtom(roundWinnerAtom);


    const handleNextRound = () => {
        resetGameBoard([...initialGameBoard.map(v => [...v])]);

        if(gameWinner !== null){
            setGameStatus(prev => ch(prev,{gameWinner: null, gameStarted: false}));
            resetRoundTable([]);
        }

        setGameLog(prevLog => (
            {...prevLog,
            x: {...defaultPlayer.x, turnLog: [], name: prevLog.x.name},
            o: {...defaultPlayer.o, turnLog: [], name: prevLog.o.name},
            draw: false,
            roundNumber: gameWinner === null ? prevLog.roundNumber+1 : 1
            }
        ))
    }

    return(
        <button className={`btn ${classG}`} onClick={handleNextRound}>
            {children}
        </button>
    )
}