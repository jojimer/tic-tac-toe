import { useRef, useEffect } from 'react';
import { gameLogAtom, isEditingAtom, gameStartedAtom, cannotStartAtom } from '../atom';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';

export default function Player({playerLog}){
    const [isEditing, setIsEditing] = useAtom(isEditingAtom);
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const player = playerLog.symbol;
    const setGameLog = useSetAtom(gameLogAtom);
    const setCannotStart = useSetAtom(cannotStartAtom);
    const gameStarted = useAtomValue(gameStartedAtom);

    const handleInputEnter = function(e){
        if(e.target.value == '' && e.key === "Enter"){
            e.target.placeholder = 'Your name...';
        }else if(e.key === "Enter") {
            buttonRef.current.click();
            setCannotStart(false);
        }
    }

    const handleButtonClick = function(){
       if(!isEditing) {
            setIsEditing(editing => !editing);
            setCannotStart(true);
       }
       
       if(inputRef.current.value === '' && isEditing){
            inputRef.current.placeholder = 'Your name...';
       }else if(inputRef.current.value !== ''){
            setCannotStart(false);
            setGameLog(prevLog => {
                const newLog = {...prevLog};
                newLog[player].name = inputRef.current.value;
                return newLog;
            })

            inputRef.current.value = ''
            setIsEditing(editing => !editing)
       }
    }
    
    useEffect(() => {
        if(isEditing){            
            inputRef.current.value = '';
            inputRef.current.placeholder = '';
            inputRef.current.focus();
        }
        // isEditing && console.log(inputRef)
    },[isEditing])

    return(
        <span className="player">
            {!isEditing && <span hidden={isEditing} className="player-name">{playerLog.name}</span>}
            <input hidden={!isEditing} ref={inputRef} type='text' onKeyDown={handleInputEnter} />
            <button hidden={gameStarted} ref={buttonRef} onClick={handleButtonClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </span>
    );
}