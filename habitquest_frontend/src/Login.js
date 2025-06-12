import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function Login({ onLogin, colorTheme }) {
  // Hardcoded fake user data for demonstration
  const users = [
    {
      username: "alice",
      password: "habit123",
      displayName: "Alice",
    },
    {
      username: "bob",
      password: "daily456",
      displayName: "Bob",
    }
  ];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      setErr("");
      onLogin({ username: found.username, displayName: found.displayName });
    } else {
      setErr("Invalid username or password.");
    }
  }

  return (
    <div className="hq-login-container">
      <form className="hq-login-form" onSubmit={handleSubmit} style={{
        background: "#fff",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        borderRadius: 12,
        maxWidth: 330,
        margin: "10vh auto",
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 16
      }}>
        <h2 style={{ color: colorTheme.primary, margin: "0 0 6px 0", textAlign: "center" }}>
          HabitQuest Login
        </h2>
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="hq-input"
          autoFocus
          required
          style={inputStyle}
          value={username}
          onChange={e => setUsername(e.target.value.trim())}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="hq-input"
          required
          style={inputStyle}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {err && <div style={{ color: colorTheme.accent, marginBottom: 8, fontWeight: 500 }}>{err}</div>}
        <button type="submit"
          className="hq-btn"
          style={{
            background: colorTheme.primary,
            color: "#fff",
            border: "none",
            fontWeight: 600,
            borderRadius: 6,
            fontSize: 18,
            padding: "10px 0",
            marginTop: 3,
            cursor: "pointer"
          }}>
          Log In
        </button>
        <div style={{ fontSize: 13, color: "#5f6a7a", marginTop: 7, textAlign: "center" }}>
          <span style={{ fontWeight: 500 }}>Demo users:</span> alice / habit123 <br /> bob / daily456
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "10px 12px",
  fontSize: 15,
  borderRadius: 5,
  border: "1px solid #d6dee8",
  background: "#f9fbfd",
  marginBottom: 3,
  outline: "none",
};
