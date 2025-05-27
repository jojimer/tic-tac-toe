import { maxRoundAtom, gameStartUseRefAtom, gameStatusAtom } from "../atom"
import { useAtom, useAtomValue } from "jotai"
import { useRef } from "react";

export const RoundInput = () => {

    const [maxRound,setMaxRound] = useAtom(maxRoundAtom);
    const [gameStartButtonUseRef, setGameStartButtonUseRef] = useAtom(gameStartUseRefAtom);
    const [{gameStarted, cannotStart}, setGameStatus] = useAtom(gameStatusAtom);

    setGameStartButtonUseRef(useRef(null))

    function handleMaxRoundInput(e){
      const v = e.target.value;
      setMaxRound(v);
    }

    function handleGameStartButton(e){
      if(cannotStart) return;
      setGameStatus(x => ({...x, gameStarted: true}))
    }

    return (
      <div className="mt-8 px-5  flex w-full items-center justify-end">
        <h3 className="font-bold">Max Round:
          <span hidden={!gameStarted}> {maxRound}</span>
        </h3>
        <input type="number" hidden={gameStarted} max="9" min="1" className="input w-36 mx-5" value={maxRound} onChange={handleMaxRoundInput} />
        <button ref={gameStartButtonUseRef} hidden={gameStarted} id="play-btn" onClick={handleGameStartButton} className={`btn btn-neutral rounded-2xl ${cannotStart ? 'cursor-not-allowed' : ''}`}>Game Start</button>
      </div>
    )
}

export default RoundInput
