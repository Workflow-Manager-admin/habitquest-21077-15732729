import React from "react";

// PUBLIC_INTERFACE
export default function NavBar({ user, onLogout, colorTheme }) {
  return (
    <nav
      className="hq-navbar"
      style={{
        background: colorTheme.primary,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 64,
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 11,
        boxShadow: "0 3px 12px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1200, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2vw" }}>
        <div className="hq-logo" style={{ display: "flex", alignItems: "center", fontWeight: 700, fontSize: 22, letterSpacing: 0.5 }}>
          <span style={{ color: colorTheme.secondary, fontSize: 24, marginRight: 5 }}>★</span>
          HabitQuest
        </div>
        {user && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <span
              className="hq-user-avatar"
              style={{
                width: 38,
                height: 38,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: colorTheme.accent,
                color: "#fff",
                fontWeight: 700,
                fontSize: 18
              }}
              title={user.username}
            >
              {user.username?.[0]?.toUpperCase() ?? "U"}
            </span>
            <button
              className="hq-btn"
              onClick={onLogout}
              style={{
                background: colorTheme.secondary,
                color: colorTheme.primary,
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 16,
                padding: "8px 18px",
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                outline: "none"
              }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
