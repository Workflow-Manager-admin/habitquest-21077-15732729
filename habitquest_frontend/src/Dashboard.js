import React, { useEffect, useState } from "react";
import HabitList from "./HabitList";
import BadgesModal from "./BadgesModal";
import CoinsDisplay from "./CoinsDisplay";

// Default starter habits for demo (could later persist with localStorage)
const DEFAULT_HABITS = [
  {
    id: 1,
    name: "Drink Water",
    goal: "8 cups daily",
    icon: "💧",
  },
  {
    id: 2,
    name: "Exercise",
    goal: "30 min workout",
    icon: "🏃‍♂️",
  },
  {
    id: 3,
    name: "Journal",
    goal: "Write 1 entry",
    icon: "📔",
  },
  {
    id: 4,
    name: "Read",
    goal: "20 min reading",
    icon: "📚",
  }
];

// Gamification - badge rules
const BADGE_RULES = [
  { id: '3d', label: "3-Day Streak", desc: "Complete a habit 3 days in a row.", threshold: 3, icon: "🥉" },
  { id: '7d', label: "7-Day Streak", desc: "Complete a habit 7 days in a row.", threshold: 7, icon: "🥈" },
  { id: '15d', label: "15-Day Streak", desc: "Complete a habit 15 days in a row!", threshold: 15, icon: "🏅" }
];

// PUBLIC_INTERFACE
export default function Dashboard({ user, colorTheme }) {
  // Overall dashboard state
  const [habits, setHabits] = useState([]);
  const [coins, setCoins] = useState(0);
  const [badges, setBadges] = useState([]);
  const [showBadges, setShowBadges] = useState(false);

  // Loads 'user data' for demo from localStorage
  useEffect(() => {
    // Load or seed user data for current logged-in username
    const ukey = `hq_userdata_${user.username}`;
    let data = localStorage.getItem(ukey);
    if (data) {
      const obj = JSON.parse(data);
      setHabits(obj.habits);
      setCoins(obj.coins);
      setBadges(obj.badges);
    } else {
      // Seed with default habits
      setHabits(
        DEFAULT_HABITS.map(h => ({
          ...h,
          history: [], // { date: 'YYYY-MM-DD', done: true }
          streak: 0,
          lastCompleted: null
        }))
      );
      setCoins(0);
      setBadges([]);
    }
  }, [user.username]);

  // Save demo progress to localStorage for current user
  function persistData(nextHabits, nextCoins, nextBadges) {
    const ukey = `hq_userdata_${user.username}`;
    localStorage.setItem(
      ukey,
      JSON.stringify({
        habits: nextHabits,
        coins: nextCoins,
        badges: nextBadges
      })
    );
  }

  // MARK: Habit completion logic
  // PUBLIC_INTERFACE
  function handleCompleteHabit(habitId, date) {
    // Mark given habit as completed for provided date
    setHabits(prev => {
      const next = prev.map(habit => {
        if (habit.id !== habitId) return habit;
        // Check if already marked today
        if (habit.history.some(h => h.date === date && h.done)) return habit;
        // Update streak: if last completed was yesterday, increment; else reset to 1
        const yesterday = prevDay(date);
        const last = habit.lastCompleted;
        const newStreak = last === yesterday ? habit.streak + 1 : 1;
        const updatedHabit = {
          ...habit,
          history: [...habit.history, { date, done: true }],
          streak: newStreak,
          lastCompleted: date
        };
        return updatedHabit;
      });
      // Award coins: 3 per habit completion
      const nextCoins = coins + 3;
      // Grant badges: for any streak hitting threshold if not earned yet
      let nextBadges = badges;
      next.forEach(habit => {
        for (const rule of BADGE_RULES) {
          if (
            habit.streak === rule.threshold &&
            (!badges.some(b => b.habitId === habit.id && b.id === rule.id))
          ) {
            nextBadges = [
              ...nextBadges,
              {
                id: rule.id,
                habitId: habit.id,
                date: date,
                label: rule.label,
                icon: rule.icon,
                habitName: habit.name
              }
            ];
          }
        }
      });
      // Persist user data
      persistData(next, nextCoins, nextBadges);
      setCoins(nextCoins);
      setBadges(nextBadges);
      return next;
    });
  }

  // Add a new custom habit
  // PUBLIC_INTERFACE
  function handleAddHabit(name, goal, icon) {
    setHabits(prev => {
      const hid = prev.length ? Math.max(...prev.map(h => h.id)) + 1 : 1;
      const newHabit = {
        id: hid,
        name,
        goal,
        icon: icon || "🧗",
        history: [],
        streak: 0,
        lastCompleted: null
      };
      const nh = [...prev, newHabit];
      persistData(nh, coins, badges);
      return nh;
    });
  }

  return (
    <div className="hq-dashboard">
      <section className="hq-dash-header" style={{ 
        background: colorTheme.primary,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 12,
        marginTop: 18,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        padding: "18px 24px",
        flexWrap: "wrap",
        gap: 15,
        minHeight: 104
      }}>
        <h2 style={{ fontWeight: 800, fontSize: 28, margin: 0 }}>
          <span role="img" aria-label="Habits" style={{ fontSize: 28, marginRight: 7 }}>🗓️</span>
          {user.displayName}'s Habit Dashboard
        </h2>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <CoinsDisplay coins={coins} colorTheme={colorTheme} />
          <button className="hq-btn"
            style={{
              background: colorTheme.secondary,
              border: "none",
              borderRadius: 7,
              fontWeight: 700,
              color: colorTheme.primary,
              fontSize: 17,
              padding: "10px 20px",
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
            }}
            onClick={() => setShowBadges(true)}>
            Badges
          </button>
        </div>
      </section>
      <HabitList
        habits={habits}
        onComplete={handleCompleteHabit}
        onAddHabit={handleAddHabit}
        colorTheme={colorTheme}
      />
      <BadgesModal
        show={showBadges}
        onClose={() => setShowBadges(false)}
        badges={badges}
        allHabits={habits}
        badgeRules={BADGE_RULES}
        colorTheme={colorTheme}
      />
    </div>
  );
}

// Helper: Get yesterday's date as YYYY-MM-DD
function prevDay(yyyymmdd) {
  const d = new Date(yyyymmdd);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}
