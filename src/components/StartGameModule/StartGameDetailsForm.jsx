import React, { useState, useEffect } from "react";
import "./StartGameDetailsForm.scss";
import Button from "../Common/Button/Button";
import { FaPlay } from "react-icons/fa";
import SessionStorage from "../../util/SessionStorage";

const storeInSession = (playerName, gameLevel, isLoggedIn) => {
  SessionStorage.setInSessionStorage(`playerName`, playerName);
  SessionStorage.setInSessionStorage("difficulty", gameLevel);
  SessionStorage.setInSessionStorage("isLoggedIn", isLoggedIn);
};

export default function StartGameDetailsForm() {
  const [playerName, setPlayerName] = useState("");
  const [gameLevel, setGameLevel] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const playerNameRef = React.createRef();

  useEffect(() => {
    playerNameRef.current.focus();
    const name = SessionStorage.getFromSessionStorage(`playerName`);
    const checkLoggedIn = SessionStorage.getFromSessionStorage(`isLoggedIn`);
    if (name && checkLoggedIn) playerNameRef.current.value=name;
  });

  const handOnStartGame = (event) => {
    event.preventDefault();
    storeInSession(
      playerName,
      gameLevel === undefined ? 1 : gameLevel,
      isLoggedIn
    );
    setIsLoggedIn(true);
    window.location.href = "./game";
  };

  return (
    <form
      className="start-game-main-content flex-column"
      onSubmit={handOnStartGame}
    >
      <input
        type="text"
        id="playerName"
        name="playerName"
        value={playerName}
        placeholder="TYPE YOUR NAME"
        ref={playerNameRef}
        onChange={(event) => setPlayerName(event.target.value.toUpperCase())}
        required
      />
      <select
        name="difficultyLevel"
        id="difficultyLevel"
        value={gameLevel}
        onChange={(event) => setGameLevel(event.target.value)}
      >
        <option value="0" disabled>
          DIFFICULTY LEVEL
        </option>
        <option value="1" selected>
          EASY
        </option>
        <option value="1.5">MEDIUM</option>
        <option value="2">HARD</option>
      </select>
      <div className="start-btn">
        <Button value="start game" Icon={FaPlay} />
      </div>
    </form>
  );
}
