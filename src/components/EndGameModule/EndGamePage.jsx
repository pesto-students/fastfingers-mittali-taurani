import React, { useEffect, useState } from "react";
import "./EndGamePage.scss";
import Header from "../Common/Header/Header";
import SessionStorage from "../../util/SessionStorage";
import Button from "../Common/Button/Button";
import { IoReloadSharp } from "react-icons/io5";
import GameUtil from "../../util/GameUtil";

const EndGamePage = () => {
  const [playerName] = useState(SessionStorage.getFromSessionStorage(`playerName`));
  const [difficultyLevel] = useState(
    Number(SessionStorage.getFromSessionStorage(`difficultyLevel`))
  );
  const [gameScores] = useState(
    JSON.parse(SessionStorage.getFromSessionStorage(`gameScores`))
  );

  const [isHighestScore, setIsHighestScore] = useState(false);

  const [restartTime, setRestartTime] = useState(5);
 
  const handlePlayAgain = (event) => {
    event.preventDefault();
    window.location.href = "./game";
  };

  const handleOnQuit = (event) => {
    event.preventDefault();
    window.location.href = "./";
  };

  useEffect(() => {
    const restartTimer = setTimeout(() => {
      setRestartTime(restartTime-1)
    },1000)
    setTimeout(() => {
      clearInterval(restartTimer);
      window.location.href = "./game";
    }, 5000);
    
  })

  useEffect(() => {
    if (GameUtil.getHighestScore(gameScores).isHighest) setIsHighestScore(true);
  }, [isHighestScore, gameScores]);

  return (
    <div className="game-end-page-content flex-column">
      <Header
        playerName={playerName}
        difficultyLevel={difficultyLevel}
        page={"endGame"}
      />
      <main className="end-game-content flex-column">
        <div className="score-details">SCORE : GAME {gameScores.length}</div>
        <div className="game-score">{gameScores[gameScores.length - 1]}</div>
        {isHighestScore ? (
          <div className="new-high-score">New High Score</div>
        ) : (
          ""
        )}
        <div className="play-again-btn">
          <Button
            value="PLAY AGAIN"
            Icon={IoReloadSharp}
            onClickHandler={handlePlayAgain}
          />
        </div>
        <div className="restart-msg">Get ready to play again in {restartTime}s</div>
      </main>
      <div className="end-game-footer">
        <button
          type="button"
          className="quit-game-button"
          onClick={(event) => handleOnQuit(event)}
        >
          Quit
        </button>
      </div>
    </div>
  );
};

export default EndGamePage;
