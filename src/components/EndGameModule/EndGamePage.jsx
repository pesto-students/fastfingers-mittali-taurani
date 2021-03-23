import React, { useEffect, useState } from "react";
import "./EndGamePage.scss";
import Header from "../Common/Header/Header";
import LocalStorage from "../../util/LocalStorage";
import Button from "../Common/Button/Button";
import { IoReloadSharp } from "react-icons/io5";

const EndGamePage = () => {
  const [playerName] = useState(LocalStorage.getFromLocalStorage(`playerName`));
  const [difficultyLevel] = useState(
    Number(LocalStorage.getFromLocalStorage(`difficultyLevel`))
  );
  const [gameScores] = useState(
    JSON.parse(LocalStorage.getFromLocalStorage(`gameScores`))
  );

  const [isHighestScore, setIsHighestScore] = useState(false);

  const handlePlayAgain = (event) => {
    event.preventDefault();
    window.location.href = "./game";
  };

  const handleOnQuit = (event) => {
    event.preventDefault();
    window.location.href = "./";
  };

  useEffect(() => {
    const gameScoreInNumeric = gameScores.map((value) =>
      Number(value.replace(":", "."))
    );
    const highestScore = Math.max(...gameScoreInNumeric);
    const currentGameScore = gameScoreInNumeric[gameScoreInNumeric.length - 1];
    if (
      highestScore === currentGameScore &&
      gameScoreInNumeric.lastIndexOf(highestScore) ===
        gameScoreInNumeric.indexOf(currentGameScore)
    )
      setIsHighestScore(true);
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
