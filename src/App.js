import React from "react";
import "./App.css";
import StartGamePage from "./components/StartGameModule/StartGamePage";
import "./components/Common/CommonStyle.scss";
import MainGamePage from "./components/MainGameModule/MainGamePage";
import Route from "./service/Route";

function App() {
  return (
    <div className="App">
      <Route path="/">
        <StartGamePage />
      </Route>
      <Route path="/game">
        <MainGamePage />
      </Route>
    </div>
  );
}

export default App;
