import React from "react";
import "./MainGamePage.scss";
import Button from '../Common/Button/Button'
import { FaTimes } from "react-icons/fa";


const handOnStopGame = (event) => {
    event.preventDefault();
    window.location.href= './';
  };

export default function MainGameFooter() {
  return (
    <div className="main-game-footer">
        <Button value="stop game" onClickHandler={handOnStopGame} Icon={FaTimes} />
    </div>
  );
}
