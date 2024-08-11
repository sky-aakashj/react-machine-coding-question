import { useEffect } from "react";
import { useState } from "react";

function ProgressBar({ value = 0, onComplete = () => {} }) {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(100, Math.max(value, 0)));
    if (value >= 100) {
      onComplete();
    }
  }, [value]);
  return (
    <div className="progress">
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent.toFixed()}%
      </span>
      <div
        style={{ width: `${percent}%` }}
        role="progreeBar"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent.toFixed()}
      />
    </div>
  );
}

export default ProgressBar;
