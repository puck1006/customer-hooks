import React, { useState } from "react";
import "./todoList.css";

let idx = Date.now();

function useTodos() {
  const [todos, setTodos] = useState([]);

  const addTodos = todo => {
    setTodos(todos => [...todos, todo]);
  };
  const removeTodos = id => {
    setTodos(todos => todos.filter(todoItem => todoItem.id !== id));
  };
  const toggleTodos = id => {
    setTodos(todos =>
      todos.map(todosItem => {
        return id === todosItem.id
          ? {
              ...todosItem,
              completed: !todosItem.completed
            }
          : todosItem;
      })
    );
  };
  return {
    todos,
    addTodos,
    removeTodos,
    toggleTodos
  };
}

export default function todoList() {
  let { todos, removeTodos, toggleTodos, addTodos } = useTodos();

  function Control() {
    const inputRef = React.useRef();

    const onsubmit = e => {
      e.preventDefault();

      if (inputRef.current.value.length === 0) {
        return;
      }

      addTodos({
        id: ++idx,
        text: inputRef.current.value,
        completed: false
      });

      inputRef.current.value = "";
      console.log(todos);
    };

    return (
      <div>
        <form onSubmit={onsubmit}>
          <label htmlFor="todoId">陈凯玲说：</label>
          <input ref={inputRef} type="text" />
        </form>
      </div>
    );
  }

  function Todo(props) {
    let { todos, removeTodos, toggleTodos } = props;

    const handleChange = id => {
      toggleTodos(id);
    };

    const handleRemove = id => {
      removeTodos(id);
    };

    return (
      <div>
        <ul className="ul_Css">
          {todos.map(todoItem => {
            return (
              <li key={todoItem.id}>
                <input
                  type="checkbox"
                  value={todoItem.completed}
                  onChange={() => handleChange(todoItem.id)}
                />
                <span
                  className={todoItem.completed ? "completed" : ""}
                  style={{ color: "red", fontSize: "30px" }}
                >
                  {todoItem.text}
                </span>
                <button onClick={() => handleRemove(todoItem.id)}>
                  删除按钮
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="todo_container">
      <Control addTodos={addTodos} />
      <Todo todos={todos} removeTodos={removeTodos} toggleTodos={toggleTodos} />
    </div>
  );
}
