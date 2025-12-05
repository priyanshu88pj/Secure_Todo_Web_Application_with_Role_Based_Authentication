import React from "react";
import API from "../services/api";

export default function TodoCard({ todo, reload, setEdit, openModal }) {
  const deleteTodo = async () => {
    await API.delete(`/todos/${todo._id}`);
    reload();
  };

  const editTodo = () => {
    setEdit(todo);
    openModal();
  };

  return (
    <div className="card">
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={editTodo}
          className="btn"
          style={{ marginRight: "8px" }}
        >
          Edit
        </button>

        <button
          onClick={deleteTodo}
          className="btn-secondary"
        >
          Delete
        </button>
      </div>
    </div>

  )}