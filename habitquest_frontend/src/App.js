import React, { useState, useEffect } from "react";
import "./App.css";

// Hardcoded user data and gamification assets
const USERS = [
  {
    username: "hero",
    password: "password123",
    displayName: "Habit Hero",
    avatar: "🦸‍♂️",
    coins: 180,
    badges: [
      { name: "3 Day Streak", icon: "🔥", desc: "Kept a streak for 3 days!" },
      { name: "Early Bird", icon: "🕊️", desc: "Finished a habit before 9 AM." },
    ],
    habits: [
      {
        id: 1,
        name: "Morning Run",
        completedDays: [1, 1, 1, 1, 1, 0, 0], // last 7 days (today last)
        streak: 5,
        color: "#4F8A8B",
      },
      {
        id: 2,
        name: "Read 10 pages",
        completedDays: [1, 0, 1, 1, 0, 1, 1],
        streak: 2,
        color: "#F76B8A",
      },
      {
        id: 3,
        name: "No Sugar",
        completedDays: [0, 1, 1, 1, 1, 1, 1],
        streak: 6,
        color: "#FBD46D",
      },
    ],
  },
];

const COLORS = {
  primary: "#4F8A8B",
  secondary: "#FBD46D",
  accent: "#F76B8A",
};

const App = () => {
  // --- Authentication State ---
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Login Logic ---
  const handleLogin = (username, password) => {
    setLoading(true);
    setTimeout(() => {
      const found = USERS.find(
        (u) => u.username === username && u.password === password
      );
      setUser(found || null);
      setLoading(false);
    }, 600);
  };

  const handleLogout = () => setUser(null);

  // --- Badge/Coins Modal ---
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="app custom-habitquest-bg">
      <NavBar
        user={user}
        onLogout={handleLogout}
        onShowSidebar={() => setShowSidebar(true)}
      />
      <main
        style={{
          minHeight: "100vh",
        }}
      >
        {!user ? (
          <div className="habitquest-center-container">
            <LoginForm onSubmit={handleLogin} loading={loading} />
          </div>
        ) : (
          <div>
            <Dashboard
              user={user}
              setUser={setUser}
              onShowSidebar={() => setShowSidebar(true)}
            />
            {showSidebar && (
              <Sidebar
                onClose={() => setShowSidebar(false)}
                coins={user.coins}
                badges={user.badges}
              />
            )}
          </div>
        )}
      </main>
      <footer className="habitquest-footer">
        {user ? (
          <>
            <span className="footer-coins">
              <span role="img" aria-label="coins" style={{ fontSize: 18 }}>
                🪙
              </span>
              {user.coins} coins
            </span>
            <span style={{ marginLeft: 16, marginRight: 8, color: COLORS.primary }}>
              • HabitQuest &copy; 2024
            </span>
          </>
        ) : (
          <span style={{ color: COLORS.primary }}>HabitQuest &copy; 2024</span>
        )}
      </footer>
    </div>
  );
};

// Top-navbar with logo, app name, and user profile (or login)
function NavBar({ user, onLogout, onShowSidebar }) {
  return (
    <nav className="navbar habitquest-navbar">
      <div className="container navbar-inner">
        <div className="logo habitquest-logo">
          <span className="logo-symbol" style={{ color: COLORS.accent, fontSize: 24 }}>
            <span role="img" aria-label="logo">
              🏆
            </span>
          </span>
          <span style={{ color: COLORS.primary, fontWeight: 600, fontSize: 22, marginLeft: 4 }}>
            HabitQuest
          </span>
        </div>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="btn habitquest-navbar-btn"
              style={{
                backgroundColor: COLORS.secondary,
                color: "#222",
                fontSize: 16,
                marginRight: 10,
                fontWeight: 500,
              }}
              onClick={onShowSidebar}
              aria-label="Show gamification"
            >
              <span role="img" aria-label="show badges">
                🏅
              </span>
              &nbsp;Badges & Coins
            </button>
            <div
              style={{
                background: "#fff3",
                borderRadius: 20,
                padding: "6px 14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontSize: 22, marginRight: 8 }}
                role="img"
                aria-label="avatar"
              >
                {user.avatar}
              </span>
              <span style={{ fontWeight: 500, color: COLORS.primary, fontSize: 17 }}>
                {user.displayName}
              </span>
            </div>
            <button
              className="btn btn-small"
              style={{
                background: COLORS.accent,
                color: "#fff",
                marginLeft: 14,
                fontSize: 15,
                fontWeight: 500,
              }}
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}

// Login Form
function LoginForm({ onSubmit, loading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fail, setFail] = useState(false);

  // Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFail(false);
    onSubmit(username, password);
    setTimeout(() => {
      // if authentication failed, user will still be null
      if (!USERS.some((u) => u.username === username && u.password === password)) {
        setFail(true);
      }
    }, 650);
  };

  return (
    <form className="habitquest-loginform" onSubmit={handleSubmit}>
      <h2
        style={{
          color: COLORS.primary,
          textAlign: "center",
          marginBottom: 10,
          fontSize: 30,
        }}
      >
        Login to HabitQuest
      </h2>
      <div className="hqlabel">Username</div>
      <input
        className="hqinput"
        autoFocus
        value={username}
        disabled={loading}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username..."
        spellCheck="false"
        style={{ marginBottom: 10 }}
      />
      <div className="hqlabel">Password</div>
      <input
        className="hqinput"
        type="password"
        value={password}
        disabled={loading}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password..."
        spellCheck="false"
        style={{ marginBottom: 17 }}
      />
      <button
        className={`btn btn-large`}
        style={{ background: COLORS.primary, color: "#fff" }}
        disabled={loading}
        type="submit"
      >
        {loading ? "..." : "Login"}
      </button>
      {fail && (
        <div
          style={{
            color: COLORS.accent,
            background: "#fff1",
            border: `1px solid ${COLORS.accent}`,
            marginTop: 16,
            padding: 10,
            borderRadius: 7,
            fontWeight: 500,
            fontSize: 15,
            textAlign: "center",
          }}
        >
          Incorrect username or password.
        </div>
      )}
      <div style={{ marginTop: 24, fontSize: 14, textAlign: "center", color: COLORS.secondary }}>
        <span style={{ color: COLORS.primary, fontWeight: 600 }}>Demo login:</span>&nbsp;
        <code>hero / password123</code>
      </div>
    </form>
  );
}

// Main dashboard showing habits, progress, action
function Dashboard({ user, setUser, onShowSidebar }) {
  const [habits, setHabits] = useState(user.habits);

  // Handle completion
  const handleComplete = (id) => {
    // Only allow if today's habit (last position in completedDays) is 0
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id || h.completedDays[6]) return h;
        // Update completedDays array (toggle last day), streak, and handle coins
        let newCompleted = h.completedDays.slice();
        newCompleted[6] = 1;
        let newStreak = h.streak + 1;
        let coinsEarned = 10;
        // Award badge for new streak milestones
        let badgesToAdd = [];
        if (newStreak === 3) {
          badgesToAdd.push({
            name: "3 Day Streak",
            icon: "🔥",
            desc: "Kept a streak for 3 days!",
          });
        }
        if (newStreak === 5) {
          badgesToAdd.push({
            name: "Streak Pro",
            icon: "🌟",
            desc: "5-day habit streak!",
          });
        }
        // Update user's coins and badges
        setUser((u) => {
          let coinAward = u.coins + coinsEarned + (newStreak === 7 ? 25 : 0);
          let badgeList = [
            ...u.badges,
            ...badgesToAdd.filter(
              (b) => !u.badges.some((owned) => owned.name === b.name)
            ),
          ];
          return { ...u, coins: coinAward, badges: badgeList };
        });
        return { ...h, completedDays: newCompleted, streak: newStreak };
      })
    );
  };

  // Update parent user object when habits change
  useEffect(() => {
    setUser((u) => ({ ...u, habits }));
    // eslint-disable-next-line
  }, [habits]);

  return (
    <div className="container dashboard-container">
      <h2
        style={{
          color: COLORS.accent,
          fontWeight: 700,
          marginTop: 44,
          fontSize: "2.3rem",
        }}
      >
        Welcome back, {user.displayName}!
      </h2>
      <div style={{ fontSize: 18, color: COLORS.secondary, margin: "8px 0 32px" }}>
        Let’s conquer your habits! Earn coins and badges for consistency.
      </div>
      <div className="habit-list-grid">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onComplete={handleComplete}
          />
        ))}
      </div>
      <div className="dashboard-gamify-footer">
        <button
          className="btn"
          style={{
            background: COLORS.secondary,
            color: "#332900",
            fontWeight: 600,
            fontSize: 17,
            marginRight: 8,
            marginTop: 10,
          }}
          onClick={onShowSidebar}
        >
          🎖️ See Badges & Coins
        </button>
      </div>
    </div>
  );
}

// Individual habit display
function HabitCard({ habit, onComplete }) {
  // Get today's completion
  const todayCompleted = habit.completedDays[6] === 1;
  // Calculate streak badge color
  let streakColor =
    habit.streak >= 5
      ? COLORS.accent
      : habit.streak >= 3
      ? COLORS.secondary
      : COLORS.primary;

  // Progress bar calculation
  const weekCompleted = habit.completedDays.reduce((acc, curr) => acc + curr, 0);
  const pct = Math.round((weekCompleted / 7) * 100);

  return (
    <div
      className="habitquest-habitcard"
      style={{
        borderColor: habit.color,
        boxShadow: todayCompleted
          ? `0px 0px 10px 1px ${habit.color}33`
          : "0 2px 8px 0 #1116",
        background: todayCompleted ? "#fff2" : "#111a",
      }}
    >
      <div className="habitcard-title">
        <span
          style={{
            display: "inline-block",
            marginRight: 6,
            fontSize: 20,
            verticalAlign: "middle",
          }}
        >
          <span role="img" aria-label="Gem" style={{ fontSize: 18 }}>
            💡
          </span>
        </span>
        <span style={{ fontSize: 19, fontWeight: 600 }}>{habit.name}</span>
      </div>
      <div className="habitcard-bar-bg">
        <div
          className="habitcard-bar-fill"
          style={{
            width: `${pct}%`,
            background: habit.color,
          }}
        />
      </div>
      <div className="habitcard-bar-labels">
        <span>
          <span style={{ color: "#fff" }}>{weekCompleted}</span>
          <span style={{ opacity: 0.7 }}>/7 days</span>
        </span>
        <span style={{ fontWeight: 500, color: streakColor }}>
          <span role="img" aria-label="fire" style={{ marginRight: 1 }}>
            🔥
          </span>
          {habit.streak} day streak
        </span>
      </div>
      <div style={{ marginTop: 9 }}>
        <button
          className="btn btn-habit-complete"
          disabled={todayCompleted}
          style={{
            background: todayCompleted ? "#9995" : habit.color,
            opacity: todayCompleted ? 0.5 : 1,
            color: todayCompleted ? "#fff" : "#222",
            fontWeight: 500,
            fontSize: 16,
          }}
          onClick={() => onComplete(habit.id)}
        >
          {todayCompleted ? "Done Today!" : "Mark as Done"}
        </button>
      </div>
    </div>
  );
}

// Sidebar/modal for coins and badges
function Sidebar({ onClose, coins, badges }) {
  return (
    <div className="habitquest-sidebar-bg">
      <div className="habitquest-sidebar">
        <button className="sidebar-close-btn" onClick={onClose}>
          ✕
        </button>
        <div
          style={{
            marginTop: 8,
            textAlign: "center",
            fontWeight: 600,
            color: COLORS.primary,
            fontSize: 26,
          }}
        >
          Gamification
        </div>
        <div
          style={{
            background: COLORS.secondary,
            color: "#222",
            padding: "10px 0",
            margin: "18px 0 30px",
            borderRadius: 9,
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
            boxShadow: "0 2px 7px 0 #0002",
            letterSpacing: "0.03em",
          }}
        >
          <span role="img" aria-label="coin" style={{ fontSize: 26 }}>
            🪙
          </span>
          &nbsp;
          <span style={{ color: COLORS.accent }}>{coins}</span> coins
        </div>
        <div style={{ fontWeight: 600, color: COLORS.primary, fontSize: 21, marginBottom: 8 }}>
          Badges
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 13 }}>
          {badges.length === 0 ? (
            <div style={{ color: "#aaa", fontSize: 16 }}>No badges yet…</div>
          ) : (
            badges.map((b, i) => (
              <div
                key={i}
                className="hq-badge"
                style={{
                  background: COLORS.primary + "18",
                  border: `1.8px solid ${COLORS.primary}`,
                  color: COLORS.primary,
                }}
                title={b.desc}
              >
                <span style={{ fontSize: 22, marginRight: 5 }}>{b.icon}</span>
                <span>{b.name}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
