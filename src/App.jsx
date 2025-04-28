import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from './winning-combinations.js';
import GameOver from "./components/GameOver.jsx";
const intitialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]

]
function  deriveActivePlayer(gameTurns){
let currentPlayer ='X';
if(gameTurns.length>0 && gameTurns[0].player==='X'){
  currentPlayer='O';
}
return currentPlayer;
} 
function deriveGameBoard(gameTurns){
  let  gameBoard = [...intitialGameBoard.map(innerArray=>[...innerArray])];

  for( const turn of gameTurns){
      const {square,player}=turn;
      const{row,col}=square;

      gameBoard[row][col]=player;
  }
 return gameBoard; 
}
function App() {
  
  // const [activeUser,setActiveUser]= useState('X');
 const  [players,setPlayers] = useState({
  X:'Player 1',
  O:'Player 2'
 });
  const [gameTurns,setGameTurns] = useState([]);
  const activeUser= deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);

    function handleRestart(){
      setGameTurns([]);
    }
    function handlePlayerNameChange(symbol,newName){
      setPlayers(prevplayers=>{
        return{
          ...prevplayers,
          [symbol] :newName
        };
      });
    }
    function deriveWinner(gameBoard,players){
      let winner;
      for( const combination of WINNING_COMBINATIONS){
        const firstSquareSymbol = gameBoard[combination[0].row] [combination[0].column];
        const secondSquareSymbol= gameBoard[combination[1].row] [combination[1].column];
        const thirdSquareSymbol= gameBoard[combination[2].row] [combination[2].column];
      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol ===thirdSquareSymbol){
        winner =players[firstSquareSymbol];
      }
      }
      return winner;
    }
    let winner = deriveWinner(gameBoard,players);


    const hasDraw = gameTurns.length ===9 && !winner;
  function handleSelectSquare(rowIndex,colIndex){
    // setActiveUser((currentActiveUser)=>currentActiveUser==='X'? 'O': 'X')
    setGameTurns((prevTurns)=>{
      // let currentPlayer= 'X';
      // if(prevTurns.length>0 && prevTurns[0].player==='X'){
      //   currentPlayer='O';
      // }
      const currentPlayer= deriveActivePlayer(gameTurns)
      const updatedTurns =[
        {square: {row:rowIndex ,col:colIndex},player:currentPlayer}
        ,...prevTurns
      ];
      return updatedTurns;
    })
  }
  return (
      <menu>
        <div id="game-container"> 
          <ol id="players" className="highlight-player">

           <Player playerName="player 1" playerSymbol="X" isActive={activeUser==='X'} onChangeName={handlePlayerNameChange} ></Player>
           <Player playerName="player 2" playerSymbol="O" isActive={activeUser==='O'} onChangeName={handlePlayerNameChange} ></Player>

          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} restart ={handleRestart} />}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} ></GameBoard>
        </div>
        <Log gameTurns={gameTurns} />
      </menu>
  )
}

export default App
