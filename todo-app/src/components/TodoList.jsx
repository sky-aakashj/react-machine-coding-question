import { useState } from "react";
import "../App.css";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const addTodoHandler = () => {
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
    setInput("");
  };
  const handleCompletedTodo = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      } else {
        return todo;
      }
    });
    setTodoList(newTodoList);
  };

  const handleDeleteTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };
  const handleEditTodo = (todo) => {
    // edit feature code
  };

  return (
    <div>
      <h1>todo app</h1>
      <input
        type="text"
        placeholder="enter todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodoHandler}>Add</button>

      <ul>
        {todoList.length > 0 &&
          todoList.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCompletedTodo(todo.id)}
              />
              <span className={todo.completed ? "marked-completed" : ""}>
                {todo.text}
              </span>
              <button onClick={() => handleEditTodo(todo)}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
