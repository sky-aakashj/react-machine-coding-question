import { useEffect, useState } from "react";
import "./App.css";
import Cell from "./components/Cell";

function App() {
  const [order, setOrder] = useState([]);
  const [deactivate, setDeactivate] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  const deactivateCells = () => {
    setDeactivate(true);
    const timer = setInterval(() => {
      setOrder((original) => {
        const clonedArray = JSON.parse(JSON.stringify(original));
        clonedArray.pop();
        if (clonedArray.length === 0) {
          clearInterval(timer);
          setDeactivate(false);
        }
        return clonedArray;
      });
    }, 300);
  };

  const activateCells = (index) => {
    const newOrder = [...order, index];
    console.log(index);
    setOrder(newOrder);

    console.log(
      "config",
      config.flat().filter((ele) => ele > 0),
      order.length
    );

    if (newOrder.length === config.flat().filter((ele) => ele > 0).length) {
      deactivateCells();
    }
  };

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div className="app">
      <h1>Grid Lights</h1>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length},1fr)` }}
      >
        {config.flat().map((value, index) => {
          return value ? (
            <Cell
              key={index}
              filled={order.includes(index)}
              onClick={() => activateCells(index)}
              isDeactivate={order.includes(index) || deactivate}
            />
          ) : (
            <span />
          );
        })}
      </div>
    </div>
  );
}

export default App;
