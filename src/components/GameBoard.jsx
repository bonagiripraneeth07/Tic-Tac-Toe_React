import { use } from "react"
import { useState } from "react"


export  default  function GameBoard({onSelectSquare ,board}){
    
    // const [gameBoard,setGameBoard]=useState(intitialGameBoard);
    // function handleSelectSquare(rowIndex,colIndex){
    //      setGameBoard((prevGameBoard)=>{
    //             const updateGameBoard = [...prevGameBoard.map((innerArray=>[...innerArray]))];
    //             updateGameBoard[rowIndex][colIndex]=activePlayerSymbol;
    //             return updateGameBoard;
    //      }) ;
    //      onSelectSquare();
    // }

    return(
        <ol id="game-board">
            {
               board.map((row,rowIndex)=>(
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol,colIndex)=>(
                               <li key={colIndex}><button onClick={()=>{onSelectSquare(rowIndex,colIndex)}} disabled={playerSymbol!=null} >{playerSymbol}</button></li> 
                            ))}
                        </ol>
                    </li>
                ))
            }
        </ol>
    )
} 