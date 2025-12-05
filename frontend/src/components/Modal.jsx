// src/components/Modal.jsx

import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    minWidth: "350px",
    maxWidth: "500px",
    padding: "20px",
    borderRadius: "12px",
    position: "relative",
    boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
  },
  closeBtn: {
    position: "absolute",
    top: "8px",
    right: "12px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
};
