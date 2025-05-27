import Player from './Player';
import RoundInput from './RoundInput';
import { gameLogAtom, isEditingAtom, maxRoundAtom, roundWinnerAtom } from '../atom';
import { useAtomValue } from 'jotai';
import { ScopeProvider } from 'jotai-scope';

export default function PlayerTable(){
    const gameLog = useAtomValue(gameLogAtom);
    const maxRound= useAtomValue(maxRoundAtom);
    const roundWinner = useAtomValue(roundWinnerAtom);

    function createRoundColumn(playerSymbol){
        const spanCol = [];
        for(let i=0; maxRound>i;i++){
            spanCol.push(<span className="round-result" key={`${playerSymbol}-${i}`}>
                {
                    roundWinner[i] === undefined ? '' : 
                    (roundWinner[i] !== undefined && roundWinner[i] == playerSymbol ? roundWinner[i] : 
                    (roundWinner[i] !== undefined && roundWinner[i] == 'd' ? 'D' : '-'))
                }
            </span>)
        }
        return spanCol
    }
    
    return (
        <div id="player-table">
            <div className="overflow-x-auto border border-base-content/5">
                <table className="table table-lg">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Round Winner</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>x</th>
                        <td><ScopeProvider atoms={[isEditingAtom]}><Player playerLog={gameLog.x} /></ScopeProvider></td>
                        <td className="round-result-wrap">{createRoundColumn('x')}</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <th>o</th>
                        <td><ScopeProvider atoms={[isEditingAtom]}><Player playerLog={gameLog.o} /></ScopeProvider></td>
                        <td className="round-result-wrap">{createRoundColumn('o')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <RoundInput />
        </div>
    )
}