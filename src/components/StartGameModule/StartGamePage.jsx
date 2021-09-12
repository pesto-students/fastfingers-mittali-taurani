import React from "react";
import "./StartGamePage.scss";
import StartGamePageHeader from './StartGamePageHeader';
import StartGameDetailsForm from './StartGameDetailsForm';

const StartGame = () => {
    return (
      <main className="start-game-main-content flex-column">
          <StartGamePageHeader />
          <StartGameDetailsForm />
      </main>
    );
}

export default StartGame;
