import React from "react";
import "./ScoreBoard.scss";

const ScoreBoard = ({ gameScores }) => {
  return (
    <div className="scoreboard-card flex-column">
      <span className="scoreboard-header">SCORE BOARD</span>
      {gameScores === null ? (
        <span>No records</span>
      ) : (
        gameScores.map((value, index) => (
          <span>
            Game {index + 1} : {value}
          </span>
        ))
      )}
    </div>
  );
};

export default ScoreBoard;
