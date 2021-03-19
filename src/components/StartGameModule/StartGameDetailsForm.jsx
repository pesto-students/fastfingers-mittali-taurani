import React, { useState, useEffect } from "react";
import "./StartGameDetailsForm.scss";
import Button from "../Common/Button/Button";
import { FaPlay } from "react-icons/fa";

const handOnStartGame = (event) => {
  event.preventDefault();
  window.location.href = "./game";
};

export default function StartGameDetailsForm(props) {
  const [playerName, setPlayerName] = useState("");
  const [gameLevel, setGameLevel] = useState("");
  const playerNameRef = React.createRef();

  useEffect(() => {
    playerNameRef.current.focus();
  });

  // useEffect(() => {
  //   console.log({playerName});
  //   console.log({gameLevel});
  // }, [playerName, gameLevel]);

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
        <option value="" disabled selected>
          DIFFICULTY LEVEL
        </option>
        <option value="1">EASY</option>
        <option value="1.5">MEDIUM</option>
        <option value="2">HARD</option>
      </select>
      <div className="start-btn">
        <Button value="start game" Icon={FaPlay} />
      </div>
    </form>
  );
}
