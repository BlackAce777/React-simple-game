import React, { useEffect, useState } from 'react';
import './GameBoard.css';
import {useSelector, useDispatch } from 'react-redux';
import {selectGameBoard, selectPossiblePoints, onMove} from '../gameBoard/gameBoardSlice';

const colors = ['red', 'aqua', 'blue', 'green', 'yellow'];

export function GameBoard() {
  const gameBoard = useSelector(selectGameBoard);
  const possiblePoints = useSelector(selectPossiblePoints);
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(-1);

  const handleMouseMove = (index) => {
    console.log(index);
    setCurrentPosition(index);
  }

  useEffect(() => {
    dispatch(onMove(currentPosition));
  }, [currentPosition, dispatch])

  return (
    <>
      <div className='gameboard'>
        {(gameBoard).map((item, index) => {
          if(possiblePoints.indexOf(index) === -1)
            return <div className={`cell bg-${colors[item - 1]}`} onMouseEnter={() => handleMouseMove(index)}></div>;
          return <div className={`cell bg-grey`} onMouseEnter={() => handleMouseMove(index)}></div>
        })}
      </div>
    </>
  )
}