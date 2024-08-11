import { useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";
import { useEffect } from "react";

function App() {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setValue((prev) => prev + 1);
    }, 100);
  }, []);

  return (
    <div className="app">
      <h1>Progress App</h1>
      <ProgressBar
        value={value}
        onComplete={() => {
          setSuccess(true);
        }}
      />
      {success ? "complete!" : "lodding..."}
    </div>
  );
}

export default App;
