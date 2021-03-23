import React from "react";
import "./App.css";
import StartGamePage from "./components/StartGameModule/StartGamePage";
import "./components/Common/CommonStyle.scss";
import MainGamePage from "./components/MainGameModule/MainGamePage";
import Route from "./service/Route";
import EndGamePage from "./components/EndGameModule/EndGamePage";

function App() {
  return (
    <div className="App">
      <Route path="/">
        <StartGamePage />
      </Route>
      <Route path="/game">
        <MainGamePage />
      </Route>
      <Route path="/result">
        <EndGamePage />
      </Route>
    </div>
  );
}

export default App;
