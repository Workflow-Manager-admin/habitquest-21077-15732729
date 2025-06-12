import React, { useState } from "react";
import HabitItem from "./HabitItem";

// PUBLIC_INTERFACE
export default function HabitList({ habits, onComplete, onAddHabit, colorTheme }) {
  // Add habit form state
  const [showForm, setShowForm] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: "", goal: "", icon: "" });
  const [err, setErr] = useState("");

  function handleFormChange(e) {
    setNewHabit({ ...newHabit, [e.target.name]: e.target.value });
    setErr('');
  }

  function handleAdd(e) {
    e.preventDefault();
    // Validation
    if (!newHabit.name.trim()) {
      setErr("Habit name required!");
      return;
    }
    if (!newHabit.goal.trim()) {
      setErr("Goal required!");
      return;
    }
    onAddHabit(newHabit.name.trim(), newHabit.goal.trim(), newHabit.icon.trim() || "🌟");
    setShowForm(false);
    setNewHabit({ name: "", goal: "", icon: "" });
    setErr('');
  }

  // Main render for the list and add form
  return (
    <div className="hq-habitlist-wrapper" style={{ margin: "48px auto 0", maxWidth: 1024, minHeight: 337, position: "relative" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16
      }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: colorTheme.primary, margin: 0 }}>
          Your Habits
        </h3>
        <button
          className="hq-btn"
          style={{
            background: colorTheme.accent,
            color: "#fff",
            borderRadius: 6,
            border: "none",
            padding: "9px 18px",
            fontWeight: 700,
            fontSize: 17,
            cursor: "pointer"
          }}
          onClick={() => setShowForm(p => !p)}
        >{showForm ? "Cancel" : "+ Add Habit"}</button>
      </div>
      {showForm && (
        <form onSubmit={handleAdd} className="hq-add-habit-form" style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          marginBottom: 12,
          background: "#f5fafc",
          padding: "10px 18px",
          borderRadius: 9,
        }}>
          <input
            type="text"
            name="icon"
            style={{ width: 38, fontSize: 21, borderRadius: 4, border: "1px solid #aaa", background: "#fff", textAlign: "center" }}
            maxLength={2}
            placeholder="🌟"
            value={newHabit.icon}
            onChange={handleFormChange}
            title="Emoji Icon (optional)"
            autoFocus
          />
          <input
            type="text"
            name="name"
            style={formInputStyle}
            placeholder="Habit Name"
            value={newHabit.name}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="goal"
            style={formInputStyle}
            placeholder="Goal (e.g., 10 push-ups)"
            value={newHabit.goal}
            onChange={handleFormChange}
            required
          />
          <button className="hq-btn" type="submit" style={{
            background: "#49c486", color: "#fff", borderRadius: 6, fontWeight: 700, border: "none", fontSize: 16, padding: "9px 18px"
          }}>Add</button>
          {err && <span style={{ color: "#d84a4a", fontWeight: 500, marginLeft: 8 }}>{err}</span>}
        </form>
      )}
      <section className="hq-habit-list-section">
        {habits.length === 0 ? (
          <div style={{ fontSize: 18, color: "#757996", fontWeight: 600, marginTop: 30 }}>
            No habits yet! Click "+ Add Habit" to get started.
          </div>
        ) : (
          <div className="hq-habit-list" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(299px, 1fr))",
            gap: "19px"
          }}>
            {habits.map(habit =>
              <HabitItem
                key={habit.id}
                habit={habit}
                onComplete={onComplete}
                colorTheme={colorTheme}
              />
            )}
          </div>
        )}
      </section>
    </div>
  );
}

const formInputStyle = {
  fontSize: 15,
  padding: "7px 10px",
  borderRadius: 5,
  background: "#fff",
  border: "1px solid #d6dee7",
  width: 112,
};
