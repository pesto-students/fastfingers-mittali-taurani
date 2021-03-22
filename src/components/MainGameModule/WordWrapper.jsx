import React, { useEffect } from "react";
import RandomWord from "./RandomWord";
import PropTypes from "prop-types";

const WordWrapper = ({ givenWord, typedWord, onChangeHandler }) => {
  const wordInputRef = React.createRef();
  useEffect(() => {
    wordInputRef.current.focus();
  });
  return (
    <section className="word-wrapper">
      <RandomWord givenWord={givenWord} typedWord={typedWord} />
      <input
        type="text"
        className="word-input"
        ref={wordInputRef}
        value={typedWord}
        onChange={(event) => onChangeHandler(event)}
      />
    </section>
  );
};

WordWrapper.propTypes = {
  givenWord: PropTypes.string,
  typedWord: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
};

WordWrapper.defaultProps = {
  givenWord: "",
  typedWord: "",
  onChangeHandler: () => {},
};

export default WordWrapper;
