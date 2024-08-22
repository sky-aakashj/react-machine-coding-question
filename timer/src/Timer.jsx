import React, { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [startAndStop, setStartAndStop] = useState(false);
  const ref = useRef(null);

  const handleStart = () => {
    if (!startAndStop) {
      setStartAndStop(true);
      ref.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };
  const handleStop = () => {
    setStartAndStop(false);
    if (ref.current) {
      clearInterval(ref.current);
    }
  };

  useEffect(() => {
    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);
  return (
    <div className="container">
      <h1>Timer</h1>
      <p>{time}</p>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
    </div>
  );
};

export default Timer;
