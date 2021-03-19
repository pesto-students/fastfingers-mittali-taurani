import React from "react";
import "./MainGamePage.scss";
import Header from "../Common/Header/Header";
import MainGameFooter from "./MainGameFooter";
import TimerCounter from "../TimerCounter/TimerCounter";
import ScoreBoard from "./ScoreBoard";

export default function MainGamePage(props) {
  return (
    <div className="game-main-page-content flex-column">
      <Header />
      <main className="game-content flex-row">
        <div className="scoreboard">
          <ScoreBoard />
        </div>
        <div className="main-game">
          <TimerCounter initialMinute={0} initialSeconds={5} timer={10} />
        </div>
      </main>
      <MainGameFooter />
    </div>
  );
}
