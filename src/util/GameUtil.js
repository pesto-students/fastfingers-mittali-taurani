import dictionary from "../data/dictionary.json";

const DIFFICULTY_LEVELS = {
  1: "EASY",
  1.5: "MEDIUM",
  2: "HARD",
};

const DATA_BY_LEVEL = {
  1: dictionary.filter((word) => word.length <= 4),
  1.5: dictionary.filter((word) => word.length >= 5 && word.length <= 8),
  2: dictionary.filter((word) => word.length > 8),
};

const WARNING_THRESHOLD = 1.5;
const ALERT_THRESHOLD = 0.5;

const GameUtil = {
  getCurrentDifficultyLevel: (difficultyLevel) =>
    DIFFICULTY_LEVELS[difficultyLevel],

  getNewWordFromDictionary: (difficultyLevel) => {
    const dataByLevel = DATA_BY_LEVEL[difficultyLevel];
    return dataByLevel[Math.floor(Math.random() * dataByLevel.length)];
  },

  getNewDifficultyLevel: (difficultyLevel) => {
    if (parseFloat(difficultyLevel) < 1.5) {
      return 1;
    } else if (
      parseFloat(difficultyLevel) >= 1.5 &&
      parseFloat(difficultyLevel) < 2
    ) {
      return 1.5;
    } else {
      return 2;
    }
  },

  getTimerValue: (wordLength, difficultyLevel) => {
    const timerValue = Math.ceil(wordLength / difficultyLevel).toFixed(2);
    return timerValue < 2 ? 2.0 : timerValue;
  },

  formatTimeValue: (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  },

  getHighestScore: (gameScores) => {
    const gameScoreInNumeric = gameScores.map((value) =>
      Number(value.replace(":", "."))
    );
    const highestScore = Math.max(...gameScoreInNumeric);
    const currentGameScore = gameScoreInNumeric[gameScoreInNumeric.length - 1];
    const result = {
      isHighest: false,
      highestScoreIndex: gameScoreInNumeric.indexOf(highestScore),
    };

    if (
      highestScore === currentGameScore &&
      result.highestScoreIndex === gameScoreInNumeric.length - 1
    )
      result.isHighest = true;
    return result;
  },

  getColorCodes: {
    info: {
      color: "green",
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD,
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD,
    },
  },
};

export default GameUtil;
