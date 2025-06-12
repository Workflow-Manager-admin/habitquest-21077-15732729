import React, { useState, useEffect } from "react";
import "./App.css";
import MainContainer from "./MainContainer";

// The habitquest app is a gamified habit tracker with authentication
function App() {
  // State to track logged in user
  const [user, setUser] = useState(null);

  // Try to auto-login if user previously logged in
  useEffect(() => {
    const userStr = localStorage.getItem("hq_user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  // Called after successful login
  // PUBLIC_INTERFACE
  function handleLogin(userObj) {
    setUser(userObj);
    localStorage.setItem("hq_user", JSON.stringify(userObj));
  }

  // PUBLIC_INTERFACE
  function handleLogout() {
    setUser(null);
    localStorage.removeItem("hq_user");
  }

  return (
    <div className="app">
      <MainContainer user={user} onLogin={handleLogin} onLogout={handleLogout} />
    </div>
  );
}

export default App;
