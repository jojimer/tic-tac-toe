import { ResetButton } from './ResetButton';
import { createRoundColumn, createRoundNumber } from './Table';
import { gameLogAtom, isEditingAtom, maxRoundAtom, roundWinnerAtom } from '../atom';
import { useAtomValue } from 'jotai';


export default function GameOver({winner}) {
    const message = (winner.name == undefined) ? 'Draw!' : winner.name + ' won!';
    const maxRound= useAtomValue(maxRoundAtom);
    const roundWinner = useAtomValue(roundWinnerAtom);
    const gameLog = useAtomValue(gameLogAtom);

    return (
        <div id="game-over">
          <div className='flex gap-8 max-sm:gap-4 justify-start flex-col lg:w-1/2 w-4/5'>
            <h2 className='flex lg:text-5xl sm:text-2xl md:text-3xl max-sm:flex-col lg:justify-between max-sm:items-center md:gap-50 max-sm:gap-2 max-sm:text-4xl'>
              <span>Game Over!</span> <span className='text-white max-sm:text-2xl capitalize'>{message}</span>
            </h2>
            
            <div className="overflow-x-auto border border-base-content/5 mb-12 max-sm:mb-3">
              <table className="table table-lg text-white">
                {/* head */}
                <thead>
                  <tr className='text-white text-xl'>
                    <th className='px-0'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-person-standing-icon lucide-person-standing"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg></th>
                    <th className="max-sm:hidden">Name</th>
                    <th className="game-rounds">
                      <div>Round Winner</div>
                      <div className="round-numbers flex py-3 absolute">
                        {createRoundNumber(maxRound)}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th className='px-0'>X</th>
                    <td className="max-sm:hidden">{gameLog.x.name}</td>
                    <td className="round-result-wrap flex absolute">{createRoundColumn('x',roundWinner,maxRound)}</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th className='px-0'>O</th>
                    <td className="max-sm:hidden">{gameLog.o.name}</td>
                    <td className="round-result-wrap flex absolute">{createRoundColumn('o',roundWinner,maxRound)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ResetButton classG="btn-xl px-10">Rematch!</ResetButton>
          </div>
        </div>
    )
}