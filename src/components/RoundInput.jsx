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
      <div className="mt-8 px-5 h-15 flex w-full items-center justify-center md:justify-end" hidden={gameStarted}>
        <h3 className="font-bold max-sm:hidden">Max Round:
          <span hidden={!gameStarted}> {maxRound}</span>
        </h3>
        <input type="number" max="9" min="1" className="input w-36 mx-5" value={maxRound} onChange={handleMaxRoundInput} />
        <button ref={gameStartButtonUseRef} id="play-btn" onClick={handleGameStartButton} className={`btn btn-neutral rounded-2xl ${cannotStart ? 'cursor-not-allowed' : ''}`}>Game Start</button>
      </div>
    )
}

export default RoundInput
