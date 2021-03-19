import React from "react";
import "./StartGamePageHeader.scss";
import KeyboardLogo from "../../assets/logo/Icon-awesome-keyboard.svg";

export default function StartGamePageHeader(props) {
  return (
    <div className="game-start-header">
      <img src={KeyboardLogo} alt="Keyboard Logo" />
      <p className="game-name-start-header">fast fingers</p>
      <h4 className="tag-line-start-header">the ultimate typing game</h4>
    </div>
  );
}
