import React from 'react';
import './ScoreBoard.scss'

const ScoreBoard = (props) => {
    return (
        <div className="scoreboard-card flex-column">
            <span className="scoreboard-header">SCORE BOARD</span>
            <span>Game 1  : 1:14</span>
            <span>Game 2 : 1:27</span>
            <span>Game 3 : 2:01</span>
            <span>Game 3 : 2:01</span>
        </div>
    );
};

export default ScoreBoard;