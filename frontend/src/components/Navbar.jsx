import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <b>Todo App</b>

      {user ? (
        <div>
          <Link to="/">Home</Link> | 
          {user.role === "admin" && <Link to="/admin"> Admin </Link>}
          | <button onClick={logout} className="btn-secondary">Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link> | 
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}
