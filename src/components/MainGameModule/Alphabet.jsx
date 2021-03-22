import React from "react";
import PropTypes from "prop-types";

const Alphabet = ({ givenAlphabet, typedAlphabet }) => {
  const mystyle = {
    textTransform: "uppercase",
    color: typedAlphabet
      ? givenAlphabet.toUpperCase() === typedAlphabet.toUpperCase()
        ? "#54BA18"
        : "#445298"
      : "#fff",
    margin: "0.1rem 0.3rem",
    fontFamily: "var(--ff-tertiary)",
  };
  return <span style={mystyle}>{givenAlphabet}</span>;
};

Alphabet.propTypes = {
  givenWord: PropTypes.string,
  typedWord: PropTypes.string,
};

Alphabet.defaultProps = {
  givenWord: "",
  typedWord: "",
};

export default Alphabet;
