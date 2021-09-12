import React, { Component } from "react";
import "./MainGamePage.scss";
import Header from "../Common/Header/Header";
import MainGameFooter from "./MainGameFooter";
import TimerCounter from "../TimerCounter/TimerCounter";
import ScoreBoard from "./ScoreBoard";
import WordWrapper from "./WordWrapper";
import GameUtil from "../../util/GameUtil";
import SessionStorage from "../../util/SessionStorage";

export default class MainGamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givenWord: "",
      typedWord: "",
      timerValue: "",
      currentGameScore: 0,
      playerName: SessionStorage.getFromSessionStorage(`playerName`),
      difficultyLevel: Number(
        SessionStorage.getFromSessionStorage(`difficultyLevel`)
      ),
    };
    this.animationCircle = React.createRef();
    this.changeDifficultyLevel = this.state.difficultyLevel;
    this.allScores = JSON.parse(SessionStorage.getFromSessionStorage(`gameScores`));
  }

  componentDidMount() {
    this.setState({ currentGameScore: 0 });
    this.startGameTimer();
    const word = GameUtil.getNewWordFromDictionary(this.state.difficultyLevel);
    const timeGiven = GameUtil.getTimerValue(
      word.length,
      this.state.difficultyLevel
    );
    this.setState({
      givenWord: word,
      timerValue: timeGiven,
    });
    this.setState({ typedWord: "" });
    setTimeout(() => {
      this.animationCircle.current.style.animation = ` countdown ${parseFloat(
        this.state.timerValue
      ).toFixed(2)}s linear forwards`;
      this.startClockTimer();
    }, 500);
  }

  decrementRemainingTime = () => {
    if (this.state.timerValue > 0) {
      this.setState(() => ({
        timerValue: this.state.timerValue - 0.05,
      }));
    } else {
      this.handleGameOver();
    }
  }

  startClockTimer = () => {
    this.clockTimer = setInterval(() => {
      this.decrementRemainingTime();
    }, 50);
  };

  startGameTimer = () => {
    this.gameTimer = setInterval(() => {
      this.setState({
        currentGameScore: parseInt(this.state.currentGameScore) + 1,
      });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.clockTimer, this.gameTimer);
  }

  handleWordChange = (event) => {
    const inputWord = event.target.value.trim();
    this.setState({ typedWord: inputWord }, () => {
      if (this.state.givenWord.toUpperCase() === inputWord.toUpperCase()) {
        clearInterval(this.clockTimer);
        this.animationCircle.current.style.animation = null;
        this.setState({
          givenWord: GameUtil.getNewWordFromDictionary(
            this.state.difficultyLevel
          ),
        });
        this.setState({ typedWord: "" });
        parseFloat((this.changeDifficultyLevel += 0.01)).toFixed(2);
        this.setState({
          difficultyLevel: GameUtil.getNewDifficultyLevel(
            this.changeDifficultyLevel
          ),
        });
        this.setState(
          {
            timerValue: GameUtil.getTimerValue(
              this.state.givenWord.length,
              this.changeDifficultyLevel
            ),
          },
          () => {
            this.animationCircle.current.classList.remove(GameUtil.getColorCodes.warning.color);
            this.animationCircle.current.classList.remove(GameUtil.getColorCodes.alert.color);  
            this.animationCircle.current.classList.add(GameUtil.getColorCodes.info.color);    
            setTimeout(() => {
              this.animationCircle.current.style.animation = `countdown ${parseFloat(
                this.state.timerValue
              ).toFixed(2)}s linear forwards`;
              this.startClockTimer();
            }, 500);
          }
        );
      }
    });
  };

  handleGameOver = () => {
    clearInterval(this.clockTimer, this.gameTimer);
    if (this.allScores === null) {
      this.allScores = [];
    }
    this.allScores.push(GameUtil.formatTimeValue(this.state.currentGameScore));
    SessionStorage.setInSessionStorage('gameScores', JSON.stringify(this.allScores));
    window.location.href= './result';
  };

  render() {
    const {
      playerName,
      difficultyLevel,
      currentGameScore,
      timerValue,
      givenWord,
      typedWord,
    } = this.state;
    return (
      <div className="game-main-page-content flex-column">
        <Header
          playerName={playerName}
          difficultyLevel={difficultyLevel}
          currentGameScore={currentGameScore}
          page={"mainGame"}
        />
        <main className="game-content flex-row">
          <div className="scoreboard">
            <ScoreBoard gameScores={this.allScores}/>
          </div>
          <div className="main-game flex-column">
            <TimerCounter
              refCircle={this.animationCircle}
              timer={
                timerValue <= 0
                  ? 0
                  : parseFloat(timerValue)
                      .toFixed(2)
                      .toString()
                      .replace(".", ":")
              }
            />
            <WordWrapper
              givenWord={givenWord}
              typedWord={typedWord}
              onChangeHandler={(event) => this.handleWordChange(event)}
            />
          </div>
        </main>
        <MainGameFooter handleOnQuit={this.handleGameOver} />
      </div>
    );
  }
}
