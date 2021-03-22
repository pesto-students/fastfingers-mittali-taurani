import React, { Component } from "react";
import "./MainGamePage.scss";
import Header from "../Common/Header/Header";
import MainGameFooter from "./MainGameFooter";
import TimerCounter from "../TimerCounter/TimerCounter";
import ScoreBoard from "./ScoreBoard";
import WordWrapper from "./WordWrapper";
import { GameUtil } from "../../util/GameUtil";
import LocalStorage from "../../util/LocalStorage";

export default class MainGamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givenWord: "",
      typedWord: "",
      timerValue: "",
      currentGameScore: 0,
      gameScores: [],
      playerName: LocalStorage.getFromLocalStorage(`playerName`),
      difficultyLevel: Number(
        LocalStorage.getFromLocalStorage(`difficultyLevel`)
      ),
    };
    this.animationCircle = React.createRef();
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
      // game over logic here
      console.log("time up");
    }
  };

  startClockTimer = () => {
    this.clockTimer = setInterval(() => {
      this.decrementRemainingTime();
    }, 50);
  };

  startGameTimer = () => {
    this.gameTimer = setInterval(() => {
      this.setState({
        currentGameScore: parseInt(this.state.currentGameScore) + 1
      });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.clockTimer);
    clearInterval(this.gameTimer);
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
        const changeDifficultyLevel = parseFloat(this.state.difficultyLevel + 0.01).toFixed(2);
        this.setState({difficultyLevel: GameUtil.getNewDifficultyLevel(changeDifficultyLevel)})
        this.setState(
          {
            timerValue: GameUtil.getTimerValue(
              this.state.givenWord.length,
              changeDifficultyLevel
            ),
          },
          () => {
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
            <ScoreBoard />
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
        <MainGameFooter />
      </div>
    );
  }
}
