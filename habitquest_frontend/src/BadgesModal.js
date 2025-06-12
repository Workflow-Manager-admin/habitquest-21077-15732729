import React from "react";

// PUBLIC_INTERFACE
export default function BadgesModal({ show, onClose, badges, allHabits, badgeRules, colorTheme }) {
  if (!show) return null;

  // Map badge requirement to unlocked/locked for each habit
  function badgeStatusForHabit(habit, rule) {
    const found = badges.find(b => b.habitId === habit.id && b.id === rule.id);
    return found ?
      { unlocked: true, date: found.date } :
      { unlocked: false };
  }
  
  return (
    <div className="hq-modal-bgoverlay" onClick={onClose}>
      <div
        className="hq-badges-modal"
        style={{
          background: "#fff",
          color: colorTheme.primary,
          borderRadius: 16,
          boxShadow: "0 6px 28px rgba(0,0,0,0.16)",
          position: "fixed",
          left: 0,
          right: 0,
          top: "12vh",
          margin: "auto",
          maxWidth: 420,
          minHeight: 360,
          zIndex: 999,
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 20
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <h2 style={{margin: 0, fontWeight: 700, fontSize: 24}}>🏆 Badges</h2>
          <button onClick={onClose} style={{
            fontWeight: 700,
            fontSize: 19,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: colorTheme.accent
          }}>✕</button>
        </div>
        <div style={{ fontSize: 16, color: "#4e5967", marginBottom: 3 }}>
          Earn badges for keeping streaks! Each badge is for a habit.
        </div>
        <div className="hq-badges-list" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {allHabits.length === 0 && (
            <div>No habits added yet.</div>
          )}
          {allHabits.map(habit =>
            <div key={habit.id} style={{ fontWeight: 600, fontSize: 16, marginBottom: 2 }}>
              <span style={{
                marginRight: 7,
                fontSize: 19
              }}>{habit.icon}</span> {habit.name}
              <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                {badgeRules.map(rule => {
                  const status = badgeStatusForHabit(habit, rule);
                  return (
                    <div
                      key={rule.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 62,
                        background: status.unlocked ? colorTheme.secondary : "#eee",
                        color: status.unlocked ? colorTheme.primary : "#c2bebe",
                        borderRadius: 8,
                        padding: "6px 2px 3px",
                        boxShadow: status.unlocked ? "0 1px 3px rgba(251,212,109,0.09)" : "none",
                        border: status.unlocked ? `2px solid ${colorTheme.primary}` : "1px solid #ddd"
                      }}
                    >
                      <span style={{ fontSize: 25, }}>{rule.icon}</span>
                      <div style={{
                        fontSize: 13,
                        fontWeight: 700,
                        marginBottom: 1
                      }}>{rule.label}</div>
                      {!status.unlocked ?
                        <span style={{ fontSize: 12, color: "#928e8e", fontWeight: 400 }} title={rule.desc}>Locked</span> :
                        <span style={{ fontSize: 12, color: colorTheme.primary }}>Unlocked</span>
                      }
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
