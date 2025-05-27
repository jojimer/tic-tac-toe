import { useSetAtom, useAtom } from 'jotai';
import { defaultPlayer, initialGameBoard, gameLogAtom, gameBoardAtom, gameStatusAtom, roundWinnerAtom } from '../atom';

export function ResetButton({children}){  
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
        <button className="btn btn-sm btn-primary" onClick={handleNextRound}>{children} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right-icon lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg></button>
    )
}