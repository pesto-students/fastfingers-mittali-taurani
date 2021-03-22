import React from "react";
import "./TimerCounter.scss";

export default function TimerCounter({ timer, refCircle }) {
  const radius = 25;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className="base-timer">
      <svg className="base-timer-svg" viewBox="0 0 100 55">
        <circle
          className="base-timer-path-elapsed-base"
          cx="50%"
          cy="50%"
          r={radius}
        />
        <circle
          className="base-timer-path-elapsed"
          cx="50%"
          cy="50%"
          r={radius}
          ref={refCircle}
          strokeDasharray={circumference}
        />
      </svg>
      <span className="base-timer-label">{timer === 0 ? <span className="time-up">Time Up</span> : timer}</span>
    </div>
  );
}
