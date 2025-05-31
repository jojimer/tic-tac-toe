import { useRef, useEffect } from 'react';
import { gameLogAtom, isEditingAtom, gameStatusAtom } from '../atom';
import { useSetAtom, useAtom } from 'jotai';

export default function Player({playerLog}){
    const [isEditing, setIsEditing] = useAtom(isEditingAtom);
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const player = playerLog.symbol;
    const setGameLog = useSetAtom(gameLogAtom);
    const [{ gameStarted, ch }, setGameStatus] = useAtom(gameStatusAtom);

    const handleInputEnter = function(e){
        if(e.target.value == '' && e.key === "Enter"){
            e.target.placeholder = 'Your name...';
        }else if(e.key === "Enter") {
            buttonRef.current.click();
            setGameStatus(x => ch(x,{cannotStart: false}))
        }
    }

    const handleButtonClick = function(){
       if(!isEditing) {
            setIsEditing(editing => !editing);
            setGameStatus(x => ch(x,{cannotStart: true}))
       }
       
       if(inputRef.current.value === '' && isEditing){
            inputRef.current.placeholder = 'Your name...';
       }else if(inputRef.current.value !== ''){
            setGameStatus(x => ch(x,{cannotStart: false}))
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
            <button className="lg:ml-5 sm:mr-0 mr-6" hidden={gameStarted} ref={buttonRef} onClick={handleButtonClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </span>
    );
}