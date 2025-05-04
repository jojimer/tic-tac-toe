import PlayerTable from './components/Table';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Log from './components/Log';
import { useAtomValue } from 'jotai';
import { gameLogAtom } from './atom';


function App() {
  const gameLog = useAtomValue(gameLogAtom);
  const winner = gameLog.x.winner ? gameLog.x : (gameLog.o.winner ? gameLog.o : gameLog.draw);

  return (
    <main>
      <div id="game-container">
        <PlayerTable />
        {/* <ol id="players">
            <Player playerLog={gameLog.x} onChangeName={setGameLog} />
            <Player playerLog={gameLog.o} onChangeName={setGameLog} />
        </ol> */}
        {winner && <GameOver winner={winner} />}
        <GameBoard />
      </div>
      <Log log={gameLog} />
    </main>
  )
}

export default App
