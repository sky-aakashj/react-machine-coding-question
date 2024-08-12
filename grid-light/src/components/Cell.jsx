function Cell({ filled, onClick, isDeactivate }) {
  return (
    <button
      className={filled ? "cell cell-activated" : "cell"}
      onClick={onClick}
      disabled={isDeactivate}
    ></button>
  );
}

export default Cell;
