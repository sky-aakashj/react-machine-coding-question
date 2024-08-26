import "../App.css";
const Pill = ({ img, text, onClick }) => {
  return (
    <span className="user-pill" onClick={onClick}>
      <img src={img} alt={text} />
      <p>{text} &times;</p>
    </span>
  );
};

export default Pill;
