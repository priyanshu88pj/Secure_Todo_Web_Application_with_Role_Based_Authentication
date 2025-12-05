import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);

  const load = async () => {
    try {
      const u = await API.get("/admin/users");
      const t = await API.get("/admin/todos");
      setUsers(u.data);
      setTodos(t.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeRole = async (id, role) => {
    await API.patch(`/admin/users/${id}/role`, { role });
    load();
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <h1 style={{ color: "white", marginBottom: "20px" }}>Admin Dashboard</h1>

      {/* USERS */}
      <div className="card">
        <h2>All Users</h2>
        {users.map((u) => (
          <div key={u._id} style={{ marginBottom: "12px" }}>
            <b>{u.username}</b> ({u.email}) — Role: {u.role}
            <button
              className="btn-secondary"
              style={{ marginLeft: "10px" }}
              onClick={() =>
                changeRole(u._id, u.role === "admin" ? "user" : "admin")
              }
            >
              {u.role === "admin" ? "Make User" : "Make Admin"}
            </button>
          </div>
        ))}
      </div>

      {/* TODOS */}
      <div className="card">
        <h2>All Todos</h2>
        {todos.map((t) => (
          <div key={t._id} style={{ marginBottom: "12px" }}>
            <b>{t.title}</b> — {t.description}
            <br />
            <small>
              Category: {t.category} | By: {t.user?.username}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
