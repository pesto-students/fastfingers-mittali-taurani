import React, { useState, useEffect } from "react";
import "./StartGameDetailsForm.scss";
import Button from "../Common/Button/Button";
import { FaPlay } from "react-icons/fa";
import LocalStorage from "../../util/LocalStorage";

const storeInSession = (playerName, difficultyLevel, isLoggedIn) => {
  LocalStorage.setInLocalStorage('playerName', playerName);
  LocalStorage.setInLocalStorage('difficultyLevel', difficultyLevel);
  LocalStorage.setInLocalStorage('isLoggedIn', isLoggedIn);
};

export default function StartGameDetailsForm() {
  const [playerName, setPlayerName] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const playerNameRef = React.createRef();

  useEffect(() => {
    playerNameRef.current.focus();
    const name = LocalStorage.getFromLocalStorage(`playerName`);
    const checkLoggedIn = LocalStorage.getFromLocalStorage(`isLoggedIn`);
    if (name && checkLoggedIn) 
    {
      playerNameRef.current.value=name;
      setPlayerName(name);
    }
  },[playerNameRef]);

  const handOnStartGame = (event) => {
    event.preventDefault();
    setPlayerName(playerName);
    setDifficultyLevel(difficultyLevel);
    setIsLoggedIn(true);
    storeInSession(
      playerName,
      difficultyLevel === undefined ? 1 : difficultyLevel,
      isLoggedIn
    );
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
        value={difficultyLevel}
        onChange={(event) => setDifficultyLevel(event.target.value)}
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
