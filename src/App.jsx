import PlayerTable from './components/Table';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Log from './components/Log';
import { useAtomValue } from 'jotai';
import { gameLogAtom, gameStatusAtom } from './atom';


function App() {
  const gameLog = useAtomValue(gameLogAtom);
  const {gameWinner} = useAtomValue(gameStatusAtom);

  return (
    <main>
      <div id="game-container" className='max-sm:flex-col max-sm:justify-evenly justify-around max-sm:gap-2'>
        <PlayerTable />
        {gameWinner!==null && <GameOver winner={gameWinner} />}
        <GameBoard />
      </div>
      {/* <Log log={gameLog} /> */}
    </main>
  )
}

export default App
