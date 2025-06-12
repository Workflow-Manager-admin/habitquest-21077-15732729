import React, { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";

// Main container - controls high level app flow and layout
// Receives: user, onLogin(), onLogout()
// PUBLIC_INTERFACE
export default function MainContainer({ user, onLogin, onLogout }) {
  // App-level color theme from context or constants
  const colorTheme = {
    primary: "#4F8A8B",
    secondary: "#FBD46D",
    accent: "#F76B8A"
  };

  // Responsive layout: fixed top navbar, main area for dashboard or login
  return (
    <div className="hq-root">
      <NavBar user={user} onLogout={onLogout} colorTheme={colorTheme} />
      <main className="hq-main-content" style={{ background: "#f7fafc", minHeight: "100vh", paddingTop: 64 }}>
        {!user ? (
          <Login onLogin={onLogin} colorTheme={colorTheme} />
        ) : (
          <Dashboard user={user} colorTheme={colorTheme} />
        )}
      </main>
    </div>
  );
}
