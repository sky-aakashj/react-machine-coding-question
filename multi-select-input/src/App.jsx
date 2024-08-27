import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pill from "./components/Pill";

function App() {
  const [searchValues, setSearchValues] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const ref = useRef(null);
  let timerRef = useRef(null);

  // 'https://dummyjson.com/users/search?q=John'
  const handleInputChange = (value) => {
    setSearchValues(value);
  };

  const debounce = (func, time) => {
    return function (...args) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        func(...args);
      }, time);
    };
  };
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
  const debouncedFetchUsers = debounce(fetchUsers, 200);

  useEffect(() => {
    debouncedFetchUsers();
  }, [searchValues]);

  const handleSelectUser = (user) => {
    setSelectedUser([...selectedUser, user]);
    setSelectedUserSet(new Set([...selectedUser, user.email]));
    setSearchValues("");
    setSearchSuggestions([]);
    ref.current.focus();
  };

  const handleRemove = (user) => {
    const newSelectedUsers = selectedUser.filter((item) => {
      return user.id !== item.id;
    });
    setSelectedUser(newSelectedUsers);
    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);

    ref.current.focus();
  };
  const handleRemovePill = (e) => {
    if (e.keyCode == 8 && !searchValues && selectedUser) {
      const deletedUser = selectedUser[selectedUser.length - 1];
      handleRemove(deletedUser);
      setSearchSuggestions([]);
    }
  };

  return (
    <>
      <h1>Multi Select Input</h1>
      <div className="user-search-container">
        <div className="user-search-input" onKeyDown={handleRemovePill}>
          {/* pills */}
          {selectedUser.map((user) => {
            return (
              <Pill
                key={user.email}
                img={user.image}
                text={`${user.firstName} ${user.lastName}`}
                onClick={() => handleRemove(user)}
              />
            );
          })}
          {/* input field */}
          <input
            type="text"
            ref={ref}
            value={searchValues}
            placeholder="Enter values"
            onChange={(e) => {
              handleInputChange(e.target.value);
            }}
          />
          <ul className="suggetstion-list">
            {searchSuggestions?.users?.map((user) => {
              return !selectedUserSet.has(user.email) ? (
                <li key={user.email} onClick={() => handleSelectUser(user)}>
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </li>
              ) : (
                <></>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
