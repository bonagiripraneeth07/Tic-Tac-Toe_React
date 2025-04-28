import { useState } from "react"
export default function Player({playerName,playerSymbol,isActive,onChangeName}){
    const [isEditing,setIsEditing]=useState(false);
    const [acutalPlayerName,updatePlayerName] = useState(playerName)
    let editablePlayerName = <span className="player-name">{acutalPlayerName}</span>;
 
    function handleEditClick(name){
       setIsEditing((editing)=>!editing);
       if(isEditing){
        onChangeName(playerSymbol,acutalPlayerName);
       }
        
    }
    function handleChange(event){
        console.log(event.target.value);
        updatePlayerName(event.target.value);
        
    }
     
    isEditing? editablePlayerName=<input type="text" required value={acutalPlayerName} onChange={handleChange} ></input>  :null;
    
    return(
        <li className={isActive ? 'active':undefined}>
        <span className="player"> 
            {editablePlayerName}
          <span className="player-symbol">{playerSymbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
        </li>
    )
}