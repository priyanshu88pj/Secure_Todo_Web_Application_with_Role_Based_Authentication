import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    console.log("FORM SUBMIT:", form);

    try {
      const res = await API.post("/auth/register", form);
      console.log("SUCCESS:", res.data);
      alert("Registered!");
      nav("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "450px", margin: "auto", marginTop: "100px" }}>
      <h2>Create Account</h2>

      <form onSubmit={submit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handle}
          required
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handle}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handle}
          required
        />

        <button className="btn" style={{ width: "100%", marginTop: "10px" }}>
          Register
        </button>
      </form>
    </div>
  );
}
