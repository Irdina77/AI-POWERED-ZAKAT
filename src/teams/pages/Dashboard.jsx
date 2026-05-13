import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useLanguage } from "../context/LanguageContext";
import { getTranslationSection } from "../translations/translations";
import "../Styles/Dashboard.css";
import zakatIcon from "../../teams/assets/zakat-icon.webp";
import Chatbot from "../components/Chatbot";
import SidebarDrawer from "../components/SidebarDrawer";

function ActivityIcon({ type }) {
  if (type === "success") return <span className="dashboard-icon">✔️</span>;
  if (type === "user") return <span className="dashboard-icon">👤</span>;
  if (type === "calc") return <span className="dashboard-icon">🧮</span>;
  if (type === "nisab") return <span className="dashboard-icon">💰</span>;
  return <span className="dashboard-icon">⚠️</span>;
}

export default function Dashboard({
  currentNisab,
  currentNisabUpdatedAt,
  totalUsers,
  zakatThisYear,
  successfulPayments,
  pendingPayments,
  users,
  calculations,
  payments,
  activities,
  onGoNisab,
}) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslationSection(language, 'homepage');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openPanel, setOpenPanel] = useState(null);
  const [showSettingMenu, setShowSettingMenu] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userName, setUserName] = useState('Valued User');
  const [userEmail, setUserEmail] = useState('');
  const settingMenuRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email || '';
        const displayName = user.displayName?.trim();
        const username = email.split('@')[0];

        setUserEmail(email);
        setUserName(
          displayName ||
            (username
              ? username.charAt(0).toUpperCase() + username.slice(1)
              : 'Valued User')
        );
      } else {
        setUserName('Valued User');
        setUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingMenuRef.current &&
        !settingMenuRef.current.contains(event.target)
      ) {
        setShowSettingMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleLogout = () => {
    alert("Logout clicked");
    setShowSettingMenu(false);
  };

  return (
    <>
      <div className="dashboard-container">
        {/* 🔥 HEADER */}
        <header className="zakat-topbar">
          <div className="zakat-brand">
            <img
              src={zakatIcon}
              alt="logo"
              className="zakat-brand-logo-img"
            />

            <div className="zakat-brand-text">
              <h1 className="zakat-brand-title">ZakatNow</h1>

              <div className="zakat-divider">
                <span></span>
                <span className="diamond">◆</span>
                <span></span>
              </div>

              <p className="zakat-brand-subtitle">
                Calculate your business zakat easily and accurately
              </p>
            </div>
          </div>

          <div className="zakat-topbar-actions">
            <button
              className="zakat-menu-button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            <div className="zakat-user-chip">
              👤 {userName}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="dashboard-hero">
          <div className="hero-card">
            <div className="hero-left">
              <p className="hero-greeting">{t.greeting}</p>
              <h2 className="hero-username">{userName}</h2>
              <p className="hero-email">{userEmail}</p>
              <p className="hero-description">
                {t.description}
              </p>
              <div className="hero-buttons">
                <button className="hero-primary-btn" onClick={() => navigate('/calculator')}>
                  {t.openCalculator}
                </button>
                <button className="hero-secondary-btn" onClick={() => navigate('/nisab')}>
                  {t.viewNisab}
                </button>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-illustration">
                <div className="illustration-main">🕌</div>
                <div className="illustration-icons">
                  <span>🧮</span>
                  <span>💰</span>
                  <span>💳</span>
                  <span>⭐</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Summary Cards */}
        <section className="dashboard-summary">
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-icon">
                <span>💰</span>
              </div>
              <div className="summary-content">
                <h3 className="summary-title">Total Nisab</h3>
                <p className="summary-value">
                  RM {Number(currentNisab.value).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <span>📊</span>
              </div>
              <div className="summary-content">
                <h3 className="summary-title">Zakat Rate</h3>
                <p className="summary-value">2.5%</p>
                <p className="summary-note">According to Syariah</p>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <span>✅</span>
              </div>
              <div className="summary-content">
                <h3 className="summary-title">System Status</h3>
                <p className="summary-value">Ready to Calculate</p>
                <p className="summary-note">All systems operational</p>
              </div>
            </div>
          </div>
        </section>

        {/* Learn About Zakat Section */}
        <section className="dashboard-education-section">
          <div className="dashboard-education-header">
            <h2 className="dashboard-education-title">Learn About Zakat</h2>
            <p className="dashboard-education-subtitle">
              Understand zakat, business zakat, and the benefits of paying zakat.
            </p>
          </div>

          <div className="dashboard-education-grid">
            {/* Card 1: What is Zakat */}
            <div className="dashboard-education-card">
              <div className="education-gold-accent"></div>
              <div className="education-icon-container">
                <span className="education-icon">💝</span>
              </div>
              <h3 className="dashboard-education-card-title">What is Zakat?</h3>
              <p className="dashboard-education-card-content">
                Zakat is a compulsory charitable contribution in Islam for Muslims who meet the required financial threshold (nisab). It helps purify wealth and supports those in need, promoting fairness and social welfare in society.
              </p>
            </div>

            {/* Card 2: What is Business Zakat */}
            <div className="dashboard-education-card">
              <div className="education-gold-accent"></div>
              <div className="education-icon-container">
                <span className="education-icon">🏢</span>
              </div>
              <h3 className="dashboard-education-card-title">What is Business Zakat?</h3>
              <p className="dashboard-education-card-content">
                Business zakat (Zakat Perniagaan) is a mandatory zakat imposed on business assets and profits that meet the nisab requirement. It is calculated annually to ensure businesses contribute fairly to the welfare of the community.
              </p>
            </div>

            {/* Card 3: Benefits of Paying Zakat */}
            <div className="dashboard-education-card">
              <div className="education-gold-accent"></div>
              <div className="education-icon-container">
                <span className="education-icon">✨</span>
              </div>
              <h3 className="dashboard-education-card-title">Benefits of Paying Zakat</h3>
              <div className="dashboard-education-benefits">
                <div className="benefit-item">✔️ Purifies wealth and income</div>
                <div className="benefit-item">✔️ Helps people in need</div>
                <div className="benefit-item">✔️ Strengthens the Muslim community</div>
                <div className="benefit-item">✔️ Encourages financial discipline</div>
                <div className="benefit-item">✔️ Brings blessings (barakah) to business</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="dashboard-footer">
          © {currentNisab.year} Zakat Organisation Portal
        </footer>
      </div>

      <SidebarDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <Chatbot />
    </>
  );
}