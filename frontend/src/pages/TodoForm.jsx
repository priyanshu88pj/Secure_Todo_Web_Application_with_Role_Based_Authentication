import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function TodoForm({ editing, reload, close }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Non-Urgent",
    dueDate: "",
    completed: false,
  });

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || "",
        description: editing.description || "",
        category: editing.category || "Non-Urgent",
        dueDate: editing.dueDate ? editing.dueDate.split("T")[0] : "",
        completed: editing.completed || false,
      });
    }
  }, [editing]);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/todos/${editing._id}`, form);
    } else {
      await API.post("/todos", form);
    }
    reload();
    close();
  };

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>
        {editing ? "Edit Todo" : "Add Todo"}
      </h2>

      <form onSubmit={submit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handle}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="3"
          value={form.description}
          onChange={handle}
        ></textarea>

        {/* FIXED CATEGORY OPTIONS */}
        <select name="category" value={form.category} onChange={handle}>
          <option value="Urgent">Urgent</option>
          <option value="Non-Urgent">Non-Urgent</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handle}
        />

        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <input
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handle}
          />
          Completed
        </label>

        <div style={{ marginTop: "15px" }}>
          <button className="btn" style={{ marginRight: "8px" }}>
            Save
          </button>
          <button type="button" className="btn-secondary" onClick={close}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
