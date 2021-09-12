import React from "react";
import "./ScoreBoard.scss";
import GameUtil from "../../util/GameUtil";

const ScoreBoard = ({ gameScores }) => {
  return (
    <div className="scoreboard-card flex-column">
      <span className="scoreboard-header">SCORE BOARD</span>
      {gameScores === null ? (
        <span>No records</span>
      ) : (
          
        gameScores.map((value, index) => (
          [(GameUtil.getHighestScore(gameScores).highestScoreIndex === index
            ? <span key={index} className="personal-best">PERSONAL BEST</span>
            : null
          ),
          <span key={index+1}>
            Game {index + 1} : {value}
          </span>
          ]
        ))
      )}
    </div>
  );
};

export default ScoreBoard;
