import React from "react";
import Cell from "./Cell";

function Grid({ config }) {
  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <div
      className="container"
      onClick={(e) => {
        handleClick(e);
      }}
    >
      {config.flat.map((value, index) => {
        return value ? <Cell key={index} filled={false} /> : <span />;
      })}
      <span key={1} className="box"></span>
    </div>
  );
}

export default Grid;
