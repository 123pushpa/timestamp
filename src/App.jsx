import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const [time, setTime] = useState(0);
  const [isActive, setActive] = useState(false);
  const [isPause, setPause] = useState(false);

  let intervalRef = useRef(null);

  function handleTime(e) {
    setTime(parseInt(e.target.value * 3600));
  }

  // const handleTime = (event) => {
  //   setTime(parseInt(event.target.value * 3600));
  // };

  function handleStart() {
    setActive(true);
    setPause(false);
  }
  function handlePause() {
    setPause(!isPause);
  }
  function handleReset() {
    clearInterval(intervalRef.current);
    setActive(false);
    setPause(false);
    setTime(0);
  }

  const formatTime = () => {
    let hours = String(Math.floor(time / 3600)).padStart(2, '0');
    let min = String(Math.floor(time / 60)).padStart(2, '0');
    let sec = String(time % 60).padStart(2, '0');
    return `${hours}: ${min} :${sec}`;
  };

  useEffect(() => {
    if (isActive && !isPause && time > 0) {
      setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setTime((prev) => prev - 1);
        });
      }, 1000);
    } else if (time === 0) {
      clearInterval(intervalRef.current);
      setActive(true);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [time, isActive, isPause]);

  return (
    <div className="container">
      <h2>COUNTER APP</h2>
      <div className="input">
        <input
          type="number"
          placeholder="ENTER TIME HERE"
          onChange={handleTime}
        />

        <div>{formatTime()}</div>
      </div>

      <div className="btn-control">
        <button onClick={handleStart} disabled={isActive && !isPause}>START</button>
        <button onClick={handlePause} disabled={!isActive }>{isPause ? "RESUME" : "PAUSE"}</button>
        <button onClick={handleReset}> RESET</button>
      </div>
    </div>
  );
}
