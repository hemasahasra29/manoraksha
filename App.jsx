import { useState } from "react";
import "./App.css";

const menuItems = [
  { id: "dashboard", icon: "🏠", label: "Dashboard" },
  { id: "mood", icon: "😊", label: "Mood Check-in" },
  { id: "ai", icon: "🤖", label: "AI Companion" },
  { id: "assessment", icon: "🧠", label: "Assessment" },
  { id: "wellness", icon: "🧘", label: "Wellness" },
  { id: "journal", icon: "📔", label: "My Journal" },
  { id: "analytics", icon: "📊", label: "My Progress" },
];

function App() {
  /* LOGIN */
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [loginError, setLoginError] = useState("");

  /* APP */
  const [screen, setScreen] = useState("dashboard");
  const [mood, setMood] = useState("");
  const [journal, setJournal] = useState("");
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm your ManoRaksha companion. You can talk to me about how you're feeling.",
    },
  ]);

  const [message, setMessage] = useState("");

  /* LOGIN FUNCTION */

  const handleLogin = () => {
    const validPatient =
      role === "patient" &&
      loginId === "patient01" &&
      password === "Mano@123";

    const validCaregiver =
      role === "caregiver" &&
      loginId === "caregiver01" &&
      password === "Care@123";

    if (validPatient || validCaregiver) {
      setLoginError("");
      setLoggedIn(true);
      setScreen("dashboard");
    } else {
      setLoginError(
        "Invalid ID or password. Please use the demo credentials."
      );
    }
  };

  /* AI CHAT */

  const sendMessage = () => {
    if (!message.trim()) return;

    const userText = message;

    setMessages((old) => [
      ...old,
      {
        sender: "user",
        text: userText,
      },
      {
        sender: "ai",
        text: "Thank you for sharing that. I'm listening. Would you like to try a short breathing exercise or tell me more about what's bothering you?",
      },
    ]);

    setMessage("");
  };

  /* ================= LOGIN PAGE ================= */

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">

          <div className="login-logo">
            🛡️
          </div>

          <div className="login-brand">
            ManoRaksha
          </div>

          <h1>Welcome back</h1>

          <p className="login-subtitle">
            Sign in to continue to your wellbeing space.
          </p>

          {/* ROLE */}

          <div className="role-selector">

            <button
              className={
                role === "patient"
                  ? "role active-role"
                  : "role"
              }
              onClick={() => {
                setRole("patient");
                setLoginError("");
              }}
            >
              👤 Patient
            </button>

            <button
              className={
                role === "caregiver"
                  ? "role active-role"
                  : "role"
              }
              onClick={() => {
                setRole("caregiver");
                setLoginError("");
              }}
            >
              👨‍👩‍👧 Caregiver
            </button>

          </div>

          {/* LOGIN ID */}

          <div className="login-field">

            <label>Login ID</label>

            <input
              type="text"
              value={loginId}
              onChange={(e) =>
                setLoginId(e.target.value)
              }
              placeholder={
                role === "patient"
                  ? "Enter patient ID"
                  : "Enter caregiver ID"
              }
            />

          </div>

          {/* PASSWORD */}

          <div className="login-field">

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              placeholder="Enter your password"
            />

          </div>

          <div className="forgot-password">
            Forgot password?
          </div>

          {loginError && (
            <div className="login-error">
              ⚠️ {loginError}
            </div>
          )}

          <button
            className="login-submit"
            onClick={handleLogin}
          >
            Login →
          </button>

          {/* DEMO CREDENTIALS */}

          <div className="demo-box">

            <strong>Demo Credentials</strong>

            {role === "patient" ? (
              <>
                <span>ID: patient01</span>
                <span>Password: Mano@123</span>
              </>
            ) : (
              <>
                <span>ID: caregiver01</span>
                <span>Password: Care@123</span>
              </>
            )}

          </div>

          <div className="login-privacy">
            🔒 Your information is private and secure.
          </div>

        </div>
      </div>
    );
  }

  /* ================= MAIN APP ================= */

  return (
    <div className="app-layout">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-logo">

          <span>🛡️</span>

          <div>
            <strong>ManoRaksha</strong>
            <small>Wellbeing Companion</small>
          </div>

        </div>

        <nav>

          {menuItems.map((item) => (

            <button
              key={item.id}
              className={
                screen === item.id
                  ? "active-menu"
                  : ""
              }
              onClick={() =>
                setScreen(item.id)
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </button>

          ))}

        </nav>

        <div className="sidebar-bottom">

          <button
            onClick={() =>
              setScreen("safety")
            }
          >
            🚨 Safety & SOS
          </button>

          <button
            onClick={() =>
              setScreen("profile")
            }
          >
            ⚙️ Settings
          </button>

          <button
            onClick={() => {
              setLoggedIn(false);
              setLoginId("");
              setPassword("");
              setLoginError("");
            }}
          >
            🚪 Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="main">

        {/* TOPBAR */}

        <header className="topbar">

          <div className="mobile-brand">
            🛡️ ManoRaksha
          </div>

          <div className="top-actions">

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
            >
              <option>English</option>
              <option>ಕನ್ನಡ</option>
              <option>हिन्दी</option>
              <option>বাংলা</option>
              <option>অসমীয়া</option>
            </select>

            <button
              className="notification"
              onClick={() =>
                setNotifications(!notifications)
              }
            >
              🔔

              {notifications && (
                <span className="notification-dot" />
              )}

            </button>

            <button
              className="profile-mini"
              onClick={() =>
                setScreen("profile")
              }
            >
              👤
            </button>

          </div>

        </header>

        {/* ================= DASHBOARD ================= */}

        {screen === "dashboard" && (

          <div className="content">

            <section className="hero">

              <div>

                <span className="eyebrow">
                  GOOD TO SEE YOU 🌱
                </span>

                <h1>
                  How are you feeling
                  <br />
                  today?
                </h1>

                <p>
                  Take a moment to check in with
                  yourself. Your wellbeing matters.
                </p>

                <button
                  className="hero-btn"
                  onClick={() =>
                    setScreen("mood")
                  }
                >
                  Check in now →
                </button>

              </div>

              <div className="hero-illustration">
                🌿
              </div>

            </section>

            {/* DAILY CHECK-IN */}

            <section className="section-title">

              <div>
                <h2>Your daily check-in</h2>

                <p>
                  A quick snapshot of your wellbeing.
                </p>
              </div>

            </section>

            <div className="mood-row">

              {[
                ["😊", "Great"],
                ["🙂", "Good"],
                ["😐", "Okay"],
                ["😔", "Low"],
                ["😣", "Stressed"],
              ].map(([emoji, name]) => (

                <button
                  key={name}
                  className={
                    mood === name
                      ? "mood-tile selected"
                      : "mood-tile"
                  }
                  onClick={() =>
                    setMood(name)
                  }
                >
                  <span>{emoji}</span>
                  <small>{name}</small>
                </button>

              ))}

            </div>

            {/* DASHBOARD CARDS */}

            <div className="dashboard-grid">

              <DashboardCard
                icon="🤖"
                title="AI Companion"
                text="Talk privately about your thoughts and feelings."
                button="Start conversation"
                onClick={() =>
                  setScreen("ai")
                }
              />

              <DashboardCard
                icon="🧠"
                title="Cognitive Assessment"
                text="Complete a short assessment to understand your wellbeing."
                button="Take assessment"
                onClick={() =>
                  setScreen("assessment")
                }
              />

              <DashboardCard
                icon="🧘"
                title="Wellness Activities"
                text="Breathing, mindfulness, relaxation and more."
                button="Explore activities"
                onClick={() =>
                  setScreen("wellness")
                }
              />

              <DashboardCard
                icon="📔"
                title="My Journal"
                text="Write down your thoughts in your private journal."
                button="Open journal"
                onClick={() =>
                  setScreen("journal")
                }
              />

            </div>

            {/* LOWER SECTION */}

            <section className="lower-grid">

              <div className="progress-panel">

                <div className="panel-heading">

                  <div>

                    <h3>My progress</h3>

                    <p>
                      Your recent wellbeing overview.
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setScreen("analytics")
                    }
                  >
                    View details →
                  </button>

                </div>

                <div className="stats">

                  <div>
                    <strong>7</strong>
                    <span>Check-ins</span>
                  </div>

                  <div>
                    <strong>4</strong>
                    <span>Activities</span>
                  </div>

                  <div>
                    <strong>72%</strong>
                    <span>Weekly score</span>
                  </div>

                </div>

              </div>

              <div className="safety-panel">

                <span>🛡️</span>

                <div>

                  <h3>
                    Need immediate support?
                  </h3>

                  <p>
                    Your safety comes first.
                  </p>

                  <button
                    onClick={() =>
                      setScreen("safety")
                    }
                  >
                    Safety Center →
                  </button>

                </div>

              </div>

            </section>

          </div>

        )}

        {/* ================= MOOD ================= */}

        {screen === "mood" && (

          <Page
            title="Mood Check-in"
            subtitle="Take a moment to understand how you're feeling."
          >

            <div className="large-card">

              <h2>
                How are you feeling right now?
              </h2>

              <div className="big-moods">

                {[
                  ["😊", "Great"],
                  ["🙂", "Good"],
                  ["😐", "Okay"],
                  ["😔", "Low"],
                  ["😣", "Stressed"],
                  ["😰", "Anxious"],
                ].map(([emoji, name]) => (

                  <button
                    key={name}
                    className={
                      mood === name
                        ? "big-mood chosen"
                        : "big-mood"
                    }
                    onClick={() =>
                      setMood(name)
                    }
                  >

                    <span>{emoji}</span>

                    <strong>{name}</strong>

                  </button>

                ))}

              </div>

              {mood && (

                <div className="success-message">

                  ✓ Mood recorded as{" "}
                  <strong>{mood}</strong>

                  <br />

                  Thank you for checking in
                  with yourself.

                </div>

              )}

            </div>

            <div className="info-grid">

              <InfoCard
                icon="📈"
                title="Mood Trends"
                text="Track how your mood changes over time."
              />

              <InfoCard
                icon="💡"
                title="Personalized Insights"
                text="Get suggestions based on your check-ins."
              />

              <InfoCard
                icon="🔔"
                title="Gentle Reminders"
                text="Stay consistent with your daily check-ins."
              />

            </div>

          </Page>

        )}

        {/* ================= AI ================= */}

        {screen === "ai" && (

          <Page
            title="AI Companion"
            subtitle="A private space where you can express yourself."
          >

            <div className="chat-container">

              <div className="chat-messages">

                {messages.map((msg, index) => (

                  <div
                    key={index}
                    className={
                      msg.sender === "user"
                        ? "chat user"
                        : "chat ai"
                    }
                  >

                    {msg.sender === "ai" && (
                      <span>🤖</span>
                    )}

                    <p>{msg.text}</p>

                  </div>

                ))}

              </div>

              <div className="chat-input">

                <input
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  placeholder="Tell me what's on your mind..."
                />

                <button
                  onClick={sendMessage}
                >
                  Send
                </button>

              </div>

            </div>

            <div className="ai-note">

              💚 ManoRaksha AI is a supportive
              companion. It does not replace
              professional mental-health care or
              emergency services.

            </div>

          </Page>

        )}

        {/* ================= ASSESSMENT ================= */}

        {screen === "assessment" && (

          <Page
            title="Cognitive & Wellbeing Assessment"
            subtitle="A simple assessment to understand your current wellbeing."
          >

            <div className="assessment-card">

              <div className="assessment-icon">
                🧠
              </div>

              <h2>
                Ready for a quick check?
              </h2>

              <p>
                This assessment can help identify
                changes in mood, memory, attention
                and everyday wellbeing.
              </p>

              <div className="assessment-features">

                <span>✓ Short and simple</span>
                <span>✓ Easy questions</span>
                <span>✓ Progress tracking</span>
                <span>✓ Personalized insights</span>

              </div>

              <button className="primary-action">
                Start Assessment →
              </button>

            </div>

          </Page>

        )}

        {/* ================= WELLNESS ================= */}

        {screen === "wellness" && (

          <Page
            title="Wellness Activities"
            subtitle="Small activities that can help you pause, relax and reconnect."
          >

            <div className="activity-grid">

              <Activity
                icon="🌬️"
                title="Breathing Exercise"
                text="Slow breathing to help you relax."
              />

              <Activity
                icon="🧘"
                title="Mindfulness"
                text="Bring your attention back to the present moment."
              />

              <Activity
                icon="🎵"
                title="Relaxation"
                text="Take a peaceful break with calming activities."
              />

              <Activity
                icon="🌿"
                title="Grounding"
                text="Use your senses to reconnect with your surroundings."
              />

              <Activity
                icon="🧠"
                title="Memory Game"
                text="A simple activity for attention and memory."
              />

              <Activity
                icon="🎯"
                title="Focus Exercise"
                text="Train your attention with a short activity."
              />

            </div>

          </Page>

        )}

        {/* ================= JOURNAL ================= */}

        {screen === "journal" && (

          <Page
            title="My Journal"
            subtitle="A private place to write down your thoughts."
          >

            <div className="journal-card">

              <div className="journal-top">

                <div>

                  <h2>
                    Today's reflection
                  </h2>

                  <p>
                    Write anything you'd like to remember.
                  </p>

                </div>

                <span>📔</span>

              </div>

              <textarea
                value={journal}
                onChange={(e) =>
                  setJournal(e.target.value)
                }
                placeholder="How was your day? What are you thinking about?"
              />

              <button className="primary-action">
                Save Journal Entry
              </button>

            </div>

          </Page>

        )}

        {/* ================= ANALYTICS ================= */}

        {screen === "analytics" && (

          <Page
            title="My Progress"
            subtitle="Understand your wellbeing journey over time."
          >

            <div className="analytics-cards">

              <div className="analytic">
                <span>😊</span>
                <strong>72%</strong>
                <p>Overall wellbeing</p>
              </div>

              <div className="analytic">
                <span>📅</span>
                <strong>7</strong>
                <p>Check-ins this week</p>
              </div>

              <div className="analytic">
                <span>🧘</span>
                <strong>4</strong>
                <p>Activities completed</p>
              </div>

            </div>

            <div className="chart-card">

              <h2>Mood this week</h2>

              <div className="fake-chart">

                {[55, 70, 60, 82, 68, 88, 76].map(
                  (height, i) => (

                    <div
                      key={i}
                      className="chart-column"
                    >

                      <div
                        style={{
                          height: `${height}%`,
                        }}
                      />

                      <span>
                        {[
                          "M",
                          "T",
                          "W",
                          "T",
                          "F",
                          "S",
                          "S",
                        ][i]}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </Page>

        )}

        {/* ================= SAFETY ================= */}

        {screen === "safety" && (

          <Page
            title="Safety Center"
            subtitle="If you need immediate help, please reach out to a trusted person or emergency service."
          >

            <div className="safety-warning">

              <div className="emergency-icon">
                🚨
              </div>

              <h2>
                Are you in immediate danger?
              </h2>

              <p>
                If you are in immediate danger,
                contact your local emergency service
                or someone you trust.
              </p>

              <button className="emergency-button">
                📞 Call Emergency Services
              </button>

            </div>

            <div className="safety-options">

              <InfoCard
                icon="👨‍👩‍👧"
                title="Trusted Contacts"
                text="Quickly reach people you trust."
              />

              <InfoCard
                icon="🏥"
                title="Professional Support"
                text="Connect with appropriate professional support."
              />

              <InfoCard
                icon="📍"
                title="Share Location"
                text="Share your location with a trusted person when needed."
              />

            </div>

          </Page>

        )}

        {/* ================= PROFILE ================= */}

        {screen === "profile" && (

          <Page
            title="Profile & Settings"
            subtitle="Manage your ManoRaksha preferences."
          >

            <div className="profile-card">

              <div className="profile-avatar">
                👤
              </div>

              <h2>
                My Profile
              </h2>

              <p>
                {role === "patient"
                  ? "Patient"
                  : "Caregiver"}
              </p>

              <div className="settings-list">

                <div>
                  <span>🌐 Language</span>
                  <strong>{language}</strong>
                </div>

                <div>
                  <span>🔔 Notifications</span>
                  <strong>
                    {notifications
                      ? "On"
                      : "Off"}
                  </strong>
                </div>

                <div>
                  <span>🔒 Privacy</span>
                  <strong>Protected</strong>
                </div>

              </div>

            </div>

          </Page>

        )}

      </main>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function DashboardCard({
  icon,
  title,
  text,
  button,
  onClick,
}) {
  return (
    <div className="dashboard-card">

      <div className="card-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <button onClick={onClick}>
        {button} →
      </button>

    </div>
  );
}

function InfoCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="info-card">

      <span>{icon}</span>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

    </div>
  );
}

function Activity({
  icon,
  title,
  text,
}) {
  return (
    <div className="activity">

      <span>{icon}</span>

      <h3>{title}</h3>

      <p>{text}</p>

      <button>
        Start activity →
      </button>

    </div>
  );
}

function Page({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="content">

      <div className="page-heading">

        <span className="eyebrow">
          MANORAKSHA
        </span>

        <h1>{title}</h1>

        <p>{subtitle}</p>

      </div>

      {children}

    </div>
  );
}

export default App;