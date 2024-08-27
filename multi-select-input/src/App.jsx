import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pill from "./components/Pill";

function App() {
  const [searchValues, setSearchValues] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [activeNavUser, setActiveNavUser] = useState(-1);
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
    //this is for when user click backspace to remove pills from input
    if (e.keyCode == 8 && !searchValues && selectedUser) {
      const deletedUser = selectedUser[selectedUser.length - 1];
      handleRemove(deletedUser);
      setSearchSuggestions([]);
    } else if (e.keyCode == 40 && searchSuggestions) {
      //this is for navigation inside the seachsuggestion when down arrow key pressed
      setActiveNavUser((prev) => (prev + 1) % searchSuggestions.users.length);
    } else if (e.keyCode == 38 && searchSuggestions) {
      //this is for navigation inside the seachsuggestion when up arrow key pressed
      if (activeNavUser <= 0) {
        setActiveNavUser(searchSuggestions.users.length - 1);
      } else {
        setActiveNavUser((prev) => prev - 1);
      }
    } else if (e.keyCode == 13 && activeNavUser >= 0) {
      //this is for selecting that user where navigation is, using enter key
      handleSelectUser(searchSuggestions.users[activeNavUser]);
      setActiveNavUser(-1);
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
          {/* suggestions box */}
          <ul className="suggetstion-list">
            {searchSuggestions?.users?.map((user, index) => {
              return !selectedUserSet.has(user.email) ? (
                <li
                  key={user.email}
                  onClick={() => handleSelectUser(user)}
                  className={activeNavUser === index ? "active" : ""}
                >
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
