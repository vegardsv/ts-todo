import React, { useReducer, useState } from "react";
import { uuid } from "../utils";
import TodoListItem from "./TodoListItem";

interface actionType {
  type: string;
  payload: any;
}

interface todo {
  uid: string;
  checked: boolean;
  title: string;
}

const reducer = (state: todo[], action: actionType) => {
  switch (action.type) {
    case "toggle": {
      return state.map(todo => {
        if (todo.uid !== action.payload) {
          return todo;
        }
        return {
          ...todo,
          checked: !todo.checked
        };
      });
    }

    case "add": {
      return state.concat({
        uid: uuid(),
        title: action.payload,
        checked: false
      });
    }
    case "delete": {
      return state.filter(x => x.uid !== action.payload);
    }
    default: {
      throw new Error(`Invalid action-type: ${action.type} `);
    }
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <h1>Todo list</h1>
      <ul>
        {state.map(todo => (
          <li key={todo.uid}>
            <TodoListItem
              uid={todo.uid}
              checked={todo.checked}
              title={todo.title}
              toggle={() => {
                dispatch({
                  type: "toggle",
                  payload: todo.uid
                });
              }}
              delete={() => {
                dispatch({
                  type: "delete",
                  payload: todo.uid
                });
              }}
            />
          </li>
        ))}
      </ul>
      <form
        onSubmit={e => {
          e.preventDefault();
          setInputValue("");
          dispatch({
            type: "add",
            payload: inputValue
          });
        }}
      >
        <input
          required={true}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default TodoList;
