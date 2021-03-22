import React from "react";
import "./Header.scss";
import { FaUserAlt, FaGamepad } from "react-icons/fa";
import GameUtil from "../../../util/GameUtil";
import PropTypes from "prop-types";

export default function Header({ playerName, difficultyLevel, currentGameScore }) {
  return (
    <div className="header-main-content flex-row">
      <section className="user-specific-details flex-column">
        <div>
          <FaUserAlt className="header-icons" />
          {playerName.toUpperCase()}
        </div>
        <div>
          <FaGamepad className="header-icons" />
          LEVEL : {GameUtil.getCurrentDifficultyLevel(difficultyLevel)}
        </div>
      </section>
      <section className="game-specific-details flex-column">
        <div className="game-name-common-header">fast fingers</div>
        <div>SCORE: {currentGameScore}</div>
      </section>
    </div>
  );
}

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  difficultyLevel: PropTypes.number.isRequired,
  currentGameScore: PropTypes.string,
};

Header.defaultProps = {
  playerName: "",
  difficultyLevel: 1,
  currentGameScore: "00:00",
};
