import React, { useEffect, useState } from "react";
import "./GameBoard.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGameBoard,
  selectPossiblePoints,
  onMove,
  onClick,
} from "../gameBoard/gameBoardSlice";

const colors = ["white", "red", "aqua", "blue", "green", "yellow"];

export function GameBoard() {
  const gameBoard = useSelector(selectGameBoard);
  const possiblePoints = useSelector(selectPossiblePoints);
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(-1);

  const handleMouseMove = (index) => {
    setCurrentPosition(index);
  };

  const handleCellClick = (index) => {
    console.log(index);
    dispatch(onClick(index));
  };

  useEffect(() => {
    dispatch(onMove(currentPosition));
  }, [currentPosition, dispatch]);

  return (
    <>
      <div className="gameboard">
        {gameBoard.map((item, index) => {
          if (possiblePoints.indexOf(index) === -1)
            return (
              <div
                className={`cell bg-${colors[item]}`}
                onMouseEnter={() => handleMouseMove(index)}
                onClick={() => handleCellClick(index)}
              ></div>
            );
          return (
            <div
              className={`cell bg-grey`}
              onMouseEnter={() => handleMouseMove(index)}
              onClick={() => handleCellClick(index)}
            ></div>
          );
        })}
      </div>
    </>
  );
}
