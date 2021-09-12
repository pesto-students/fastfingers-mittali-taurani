import React, { useEffect } from "react";
import GameUtil from "../../util/GameUtil";
import "./TimerCounter.scss";

export default function TimerCounter({ timer, refCircle }) {
  const radius = 25;
  const circumference = radius * 2 * Math.PI;
  const remainingPathColor = GameUtil.getColorCodes.info.color;

  function setRemainingPathColor() {
    const timeToCheck = Number(timer.toString().replace(":", "."));
    const { alert, warning, info } = GameUtil.getColorCodes;
    if (timeToCheck === 0) {
      refCircle.current.classList.add(info.color);
    } else if (timeToCheck <= alert.threshold) {
      refCircle.current.classList.remove(warning.color);
      refCircle.current.classList.add(alert.color);
    } else if (timeToCheck <= warning.threshold) {
      refCircle.current.classList.remove(info.color);
      refCircle.current.classList.add(warning.color);
    }
  }

  useEffect(() => {
    setRemainingPathColor();
  });

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
          className={`base-timer-path-elapsed ${remainingPathColor}`}
          cx="50%"
          cy="50%"
          r={radius}
          ref={refCircle}
          strokeDasharray={circumference.toFixed(0)}
        />
      </svg>
      <span className="base-timer-label">
        {timer === 0 ? <span className="time-up">Time Up</span> : timer}
      </span>
    </div>
  );
}
