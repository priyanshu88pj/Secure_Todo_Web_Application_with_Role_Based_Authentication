import React, { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ emailOrUsername: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      // Backend returns → role + token
      login({ role: res.data.role }, res.data.token);

      nav("/");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Login failed");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "450px", margin: "auto", marginTop: "100px" }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Email or Username"
          onChange={(e) => setForm({ ...form, emailOrUsername: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn" style={{ width: "100%" }}>Login</button>
      </form>
    </div>
  );
}
