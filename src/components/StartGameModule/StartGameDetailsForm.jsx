import React, { useState, useEffect } from "react";
import "./StartGameDetailsForm.scss";
import Button from "../Common/Button/Button";
import { FaPlay } from "react-icons/fa";
import SessionStorage from "../../util/SessionStorage";

const storeInSession = (playerName, difficultyLevel, isLoggedIn) => {
  SessionStorage.setInSessionStorage("playerName", playerName);
  SessionStorage.setInSessionStorage("difficultyLevel", difficultyLevel);
  SessionStorage.setInSessionStorage("isLoggedIn", isLoggedIn);
};

export default function StartGameDetailsForm() {
  const [playerName, setPlayerName] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playerNameError, setPlayerNameError] = useState(null);
  const [showHideError, setShowHideError ] = useState("hide");
  const playerNameRef = React.createRef();

  useEffect(() => {
    playerNameRef.current.focus();
    const name = SessionStorage.getFromSessionStorage(`playerName`);
    const checkLoggedIn = SessionStorage.getFromSessionStorage(`isLoggedIn`);
    if (name && checkLoggedIn) {
      playerNameRef.current.value = name;
      setPlayerName(name);
    }
  }, [playerNameRef]);

  const formValidation = () => {
    if (playerName === "") {
      setPlayerNameError("Please Enter Your Name");
      setShowHideError("show");
      return true;
    } else {
      setPlayerNameError(null);
      setShowHideError("hide");
      return false;
    }
  };

  const handOnStartGame = (event) => {
    event.preventDefault();
    if (!formValidation()) {
      setPlayerName(playerName);
      setDifficultyLevel(difficultyLevel);
      setIsLoggedIn(true);
      storeInSession(
        playerName,
        difficultyLevel === undefined ? 1 : difficultyLevel,
        isLoggedIn
      );
      window.location.href = "./game";
    }
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
        onChange={(event) => {setPlayerName(event.target.value.toUpperCase()); setShowHideError("hide")}}
      />
      <div className={`player-name-error ${showHideError}`}>{playerNameError}</div>
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
