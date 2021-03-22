import React from "react";
import PropTypes from "prop-types";
import Alphabet from "./Alphabet";

const RandomWord = ({ givenWord, typedWord }) => (
  <div className="word-wrapper">
    {[...givenWord].map((alphabet, index) => (
      <Alphabet key={index} givenAlphabet={alphabet} typedAlphabet={typedWord[index]} />
    ))}
  </div>
);

RandomWord.propTypes = {
  givenWord: PropTypes.string,
  typedWord: PropTypes.string,
};

RandomWord.defaultProps = {
  givenWord: "",
  typedWord: "",
};

export default RandomWord;
