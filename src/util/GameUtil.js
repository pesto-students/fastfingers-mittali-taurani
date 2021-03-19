const DIFFICULTY_LEVELS = {
  1 : 'EASY',
  1.5 : 'MEDIUM',
  2 : 'HARD'
}

const GameUtil = {
    getCurrentDifficultyFactor: (difficulty) => DIFFICULTY_LEVELS[difficulty]
}

export default GameUtil;