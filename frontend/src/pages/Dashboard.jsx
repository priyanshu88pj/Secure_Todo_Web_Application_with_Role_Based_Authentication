import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import TodoCard from "../components/TodoCard";
import Modal from "../components/Modal";
import TodoForm from "./TodoForm";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("TODO LOAD ERROR:", err);

      // If token expired or unauthorized → logout user
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        logout();
      }
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAddTodo = () => {
    setEdit(null); // clear edit state
    setOpen(true);
  };

  return (
    <>
      <button className="btn" onClick={openAddTodo}>+ Add Todo</button>

      <div style={{ marginTop: 20 }}>
        {todos.map((t) => (
          <TodoCard
            key={t._id}
            todo={t}
            reload={load}
            setEdit={setEdit}
            openModal={() => setOpen(true)}
          />
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <TodoForm
          editing={edit}
          reload={load}
          close={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}
