import Player from './Player';
import RoundInput from './RoundInput';
import { gameLogAtom, isEditingAtom, maxRoundAtom, roundWinnerAtom } from '../atom';
import { useAtomValue } from 'jotai';
import { ScopeProvider } from 'jotai-scope';

export function createRoundColumn(playerSymbol,roundWinner,maxRound){
    const spanCol = [];
    for(let i=0; maxRound>i;i++){
        spanCol.push(<span className="round-result" key={`${playerSymbol}-${i}`}>
            {
                roundWinner[i] === undefined ? '' : 
                (roundWinner[i] !== undefined && roundWinner[i] == playerSymbol ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-green-500 lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg> : 
                (roundWinner[i] !== undefined && roundWinner[i] == 'd' ? 'D' : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-red-500 lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>))
            }
        </span>)
    }
    return spanCol
}

export function createRoundNumber(maxRound){
    const spanCol = [];
    for(let i=0; maxRound>i;i++){
        spanCol.push(<span className="round-number" key={`round-${i}`}>{i+1}</span>)
    }
    return spanCol
}

export default function PlayerTable(){
    const gameLog = useAtomValue(gameLogAtom);
    const maxRound= useAtomValue(maxRoundAtom);
    const roundWinner = useAtomValue(roundWinnerAtom);
    
    return (
        <div id="player-table" className='w-full md:w-1/2 max-sm:pt-15 max-sm:px-5 pl-30'>
            <div className="overflow-x-auto border border-base-content/5">
                <table className="table table-lg">
                    {/* head */}
                    <thead>
                    <tr>
                        <th className="max-sm:p-"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="max-sm:ml-2.5 lucide lucide-person-standing-icon lucide-person-standing"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg></th>
                        <th className="max-sm:p-2">Name</th>
                        <th className='hidden lg:block relative'><span className='absolute'>Round Winner</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr>
                        <th className="max-sm:p-2">x</th>
                        <td><ScopeProvider atoms={[isEditingAtom]}><Player playerLog={gameLog.x} /></ScopeProvider></td>
                        <td className="hidden lg:flex round-result-wrap">{createRoundColumn('x',roundWinner,maxRound)}</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <th className="max-sm:p-2">o</th>
                        <td><ScopeProvider atoms={[isEditingAtom]}><Player playerLog={gameLog.o} /></ScopeProvider></td>
                        <td className="hidden lg:flex round-result-wrap">{createRoundColumn('o',roundWinner,maxRound)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <RoundInput />
        </div>
    )
}