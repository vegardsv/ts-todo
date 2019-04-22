import React from "react";

export interface todoListItemProps {
  uid: string;
  checked: boolean;
  title: string;
  toggle: (arg0: string) => void;
  delete: (arg0: string) => void;
}

const TodoListItem = (props: todoListItemProps) => {
  return (
    <div>
      <input
        onChange={() => props.toggle(props.uid)}
        type="checkbox"
        checked={props.checked}
      />
      <p>{props.title}</p>
      <button onClick={() => props.delete(props.uid)}>Delete</button>
    </div>
  );
};

export default TodoListItem;
