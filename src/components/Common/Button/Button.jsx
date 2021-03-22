import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

export default function Button({ value, Icon, onClickHandler }) {
  return (
    <button type="submit" className="main-game-button" onClick={onClickHandler}>
      <Icon className="icon" />
      {value.toUpperCase()}
    </button>
  );
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  onClickHandler: PropTypes.func,
};
