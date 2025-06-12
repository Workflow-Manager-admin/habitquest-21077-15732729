import React from "react";

// PUBLIC_INTERFACE
export default function CoinsDisplay({ coins, colorTheme }) {
  return (
    <div className="hq-coins-display" style={{
      display: "flex", alignItems: "center", background: "#fff",
      color: colorTheme.primary, borderRadius: 8, padding: "7px 13px", fontWeight: 700,
      boxShadow: "0 1px 6px rgba(76,138,139,0.10)", fontSize: 16
    }}>
      <span style={{
        fontSize: 21, marginRight: 7, color: colorTheme.secondary
      }}>🪙</span>
      {coins} Coins
    </div>
  );
}
