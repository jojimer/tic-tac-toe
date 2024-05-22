import { useState, useRef, useEffect } from 'react';

export default function Player({playerLog,onChangeName}){
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const player = playerLog.symbol

    const handleInputEnter = function(e){
        if(e.target.value == '' && e.key === "Enter"){
            e.target.placeholder = 'Your name...';
        }else if(e.key === "Enter") buttonRef.current.click();
    }

    const handleButtonClick = function(){
       if(!isEditing) setIsEditing(editing => !editing);
       if(inputRef.current.value === '' && isEditing){
            inputRef.current.placeholder = 'Your name...';
       }else if(inputRef.current.value !== ''){
            onChangeName(prevLog => {
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
        <li className={(playerLog.active) ? 'active' : undefined}>
            <span className="player">
                {!isEditing && <span hidden={isEditing} className="player-name">{playerLog.name}</span>}
                <input hidden={!isEditing} ref={inputRef} type='text' onKeyDown={handleInputEnter} />
                <span className="player-symbol">{playerLog.symbol}</span>
                <button ref={buttonRef} onClick={handleButtonClick}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
        </li>
    );
}