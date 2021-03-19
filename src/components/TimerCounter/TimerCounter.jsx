import React, { useEffect, useState } from "react";
import "./TimerCounter.scss";

export default function TimerCounter({ timer }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const radius = 25;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const formatTime = (timer) => {
      setMinutes(Math.floor(timer / 60));
      setSeconds(timer % 60);
    };
    formatTime(timer);
  }, [timer]);

  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      console.log("clear from returned called");
      if (interval) clearInterval(interval);
    };
  });
  return (
    <div className="base-timer">
      <svg className="base-timer-svg" viewBox="0 0 100 100">
        <circle
          className="base-timer-path-elapsed-base"
          cx="50%"
          cy="50%"
          r={radius}
          strokeDasharray={circumference}
        />
        <circle
          className="base-timer-path-elapsed"
          cx="50%"
          cy="50%"
          r={radius}
          strokeDasharray={circumference}
        />
      </svg>
      <span className="base-timer-label">{minutes === 0 && seconds === 0
        ? <span className="time-up">Time Up</span>
        : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</span>
    </div>
  );
}
