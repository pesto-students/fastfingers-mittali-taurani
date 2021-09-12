import React from "react";
import "./MainGamePage.scss";
import Button from '../Common/Button/Button'
import { FaTimes } from "react-icons/fa";

export default function MainGameFooter( {handleOnQuit}) {
  return (
    <div className="main-game-footer">
        <Button value="stop game" onClickHandler={handleOnQuit} Icon={FaTimes} />
    </div>
  );
}
