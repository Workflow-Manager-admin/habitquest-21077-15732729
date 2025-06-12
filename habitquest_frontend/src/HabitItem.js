import React from "react";

// PUBLIC_INTERFACE
export default function HabitItem({ habit, onComplete, colorTheme }) {
  // Today in YYYY-MM-DD
  const today = new Date();
  const yyyy_mm_dd = today.toISOString().slice(0, 10);
  const completedToday = habit.history.some(h => h.date === yyyy_mm_dd && h.done);

  // Show the last 7 days for this habit's progress array
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dt = d.toISOString().slice(0, 10);
    const markedDone = habit.history.some(hh => hh.date === dt && hh.done);
    return {
      date: dt,
      done: markedDone
    };
  });

  return (
    <div className="hq-habit-card" style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 12px rgba(0,0,0,0.045)",
      padding: "22px 20px 15px",
      display: "flex",
      flexDirection: "column",
      minHeight: 201,
      gap: 7,
      position: "relative"
    }}>
      <div style={{ fontSize: 25, marginBottom: 6 }}>{habit.icon}</div>
      <div style={{ fontWeight: 700, fontSize: 21 }}>{habit.name}</div>
      <div style={{ fontWeight: 500, color: "#748494", fontSize: 15, marginBottom: 2 }}>
        Goal: <span style={{ color: colorTheme.primary }}>{habit.goal}</span>
      </div>
      <div className="hq-streak-row" style={{
        display: "flex", alignItems: "center", gap: 8, margin: "7px 0"
      }}>
        <span style={{ fontSize: 19 }}>🔥</span>
        <span style={{ fontWeight: 600, color: colorTheme.accent, letterSpacing: 1 }}>Streak: {habit.streak}</span>
      </div>
      <div className="hq-progress-row" style={{
        margin: "9px 0 6px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 2
      }}>
        {/* 7-day progress bubbles */}
        {last7.map(day => (
          <span
            key={day.date}
            title={day.date}
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: day.done ? colorTheme.primary : "#e2e6ec",
              display: "inline-block",
              marginRight: 2,
              border: day.date === yyyy_mm_dd ? `2px solid ${colorTheme.accent}` : "none"
            }}
          ></span>
        ))}
      </div>
      <button
        className="hq-btn"
        style={{
          marginTop: "auto",
          background: completedToday ? "#83c3a1" : colorTheme.primary,
          color: "#fff",
          border: "none",
          borderRadius: 7,
          padding: "9px 0",
          fontWeight: 600,
          fontSize: 16,
          cursor: completedToday ? "default" : "pointer",
          boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
          opacity: completedToday ? 0.7 : 1
        }}
        disabled={completedToday}
        onClick={() => {
          if (!completedToday) onComplete(habit.id, yyyy_mm_dd);
        }}
      >
        {completedToday ? "Completed" : "Mark as Done"}
      </button>
    </div>
  );
}
