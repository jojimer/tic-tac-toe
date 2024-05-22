import Player from './components/Player';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Log from './components/Log';
import { useState } from 'react';

const defaultPlayer = {
  'x': {
    'name': 'Player 1',
    'symbol': 'x',
    'active': true,
    'turnLog': [],
    'winner': false
  },
  'o': {
    'name': 'Player 2',
    'symbol': 'o',
    'active': false,
    'turnLog': [],
    'winner': false
  },
  'draw': false
}

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

let gameBoard = [...initialGameBoard.map(v => [...v])];
let newSet = {'x':{...defaultPlayer.x},'o':{...defaultPlayer.o},'draw':false};

function App() {
  const [gameLog,setGameLog] = useState(newSet);
  const winner = gameLog.x.winner ? gameLog.x : (gameLog.o.winner ? gameLog.o : gameLog.draw);
  
  const handleRematch = function(){
    gameBoard = [...initialGameBoard.map(v => [...v])];

    setGameLog(prevLog => {
      newSet = {'x':{...defaultPlayer.x},'o':{...defaultPlayer.o},'draw':false};
      newSet.x.name = prevLog.x.name
      newSet.o.name = prevLog.o.name
      newSet.x.turnLog = []
      newSet.o.turnLog = []
      return newSet;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
            <Player playerLog={gameLog.x} onChangeName={setGameLog} />
            <Player playerLog={gameLog.o} onChangeName={setGameLog} />
        </ol>
        {winner && <GameOver winner={winner} rematch={handleRematch} data={defaultPlayer} />}
        <GameBoard log={gameLog} onSelectBox={setGameLog} board={gameBoard}/>
      </div>
      <Log log={gameLog} />
    </main>
  )
}

export default App
