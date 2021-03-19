import React from "react";
import "./Header.scss";
import { FaUserAlt, FaGamepad } from "react-icons/fa";
import SessionStorage from '../../../util/SessionStorage';
import GameUtil from '../../../util/GameUtil'

export default function Header() {

  const playerName = SessionStorage.getFromSessionStorage(`playerName`);
  const difficulty = SessionStorage.getFromSessionStorage(`difficulty`);
  
  return (
    <div className="header-main-content flex-row">
      <section className="user-specific-details flex-column">
        <div><FaUserAlt className="header-icons"/>{playerName.toUpperCase()}</div>
        <div><FaGamepad className="header-icons"/>LEVEL : {GameUtil.getCurrentDifficultyFactor(difficulty)}</div>
      </section>
      <section className="game-specific-details flex-column">
        <div className="game-name-common-header">fast fingers</div>
        <div>SCORE: 00:30</div>
      </section>
    </div>
  );
}
