import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchValues, setSearchValues] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  // 'https://dummyjson.com/users/search?q=John'
  const handleInputChange = (value) => {
    setSearchValues(value);
  };

  useEffect(() => {
    const fetchUsers = () => {
      if (searchValues.trim() === "") {
        setSearchSuggestions([]);
        return;
      }
      fetch(`https://dummyjson.com/users/search?q=${searchValues}`)
        .then((res) => res.json())
        .then((data) => setSearchSuggestions(data))
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUsers();
  }, [searchValues]);

  return (
    <>
      <h1>Multi Select Input</h1>
      <div className="user-search-container">
        <div className="user-search-input">
          {/* pills */}
          {/* input field */}
          <input
            type="text"
            value={searchValues}
            placeholder="Enter values"
            onChange={(e) => {
              handleInputChange(e.target.value);
            }}
          />
          <ul className="suggetstion-list">
            {searchSuggestions?.users?.map((user) => (
              <li key={user.id}>{user.firstName}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
