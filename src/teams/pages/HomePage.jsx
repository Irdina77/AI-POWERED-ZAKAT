import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useLanguage } from '../context/LanguageContext';
import { getTranslationSection } from '../translations/translations';
import SidebarDrawer from '../components/SidebarDrawer';
import '../Styles/HomePage.css';
import zakatIcon from '../../teams/assets/zakat-icon.webp';

export default function HomePage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslationSection(language, 'homepage');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userName, setUserName] = useState('Valued User');
  const [userEmail, setUserEmail] = useState('');
  const [nisabValue, setNisabValue] = useState(42047);

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
    const savedNisab = JSON.parse(localStorage.getItem('nisabData') || '{}');
    if (savedNisab.goldPrice) {
      setNisabValue(Number(savedNisab.goldPrice) * 85);
    } else {
      setNisabValue(42047 * 85); // Default calculation
    }
  }, []);

  return (
    <>
      <div className="home-page">
        <header className="home-topbar">
          <div className="home-brand">
            <img
              src={zakatIcon}
              alt="logo"
              className="home-brand-logo-img"
            />
            <div className="home-brand-text">
              <h1 className="home-brand-title">ZakatNow</h1>
              <div className="home-divider">
                <span></span>
                <span className="diamond">◆</span>
                <span></span>
              </div>
              <p className="home-brand-subtitle">
                Calculate your business zakat easily and accurately
              </p>
            </div>
          </div>

          <div className="home-topbar-actions">
            <button
              className="home-menu-button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
            <div className="home-user-chip">
              👤 User
            </div>
          </div>
        </header>

        <main className="home-main">
          <section className="home-hero-section">
            <div className="home-hero-content">
              <div className="home-hero-text">
                <h2 className="home-greeting">ASSALAMUALAIKUM, WELCOME BACK</h2>
                <h3 className="home-user-name">{userName}</h3>
                <p className="home-user-email">{userEmail}</p>
                <p className="home-description">
                  {t.description}
                </p>
                <div className="home-hero-buttons">
                  <button onClick={() => navigate('/calculator')} className="home-btn-primary">
                    {t.openCalculator}
                  </button>
                  <button onClick={() => navigate('/nisab')} className="home-btn-secondary">
                    {t.viewNisab}
                  </button>
                </div>
              </div>
              <div className="home-hero-illustration">
                <div className="illustration-content">
                  <div className="illustration-icon">🕌</div>
                  <div className="illustration-elements">
                    <span className="ill-element">💰</span>
                    <span className="ill-element">🧮</span>
                    <span className="ill-element">📊</span>
                  </div>
                  <div className="illustration-pattern">
                    <span>✦</span>
                    <span>☪️</span>
                    <span>✦</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="home-stats-section">
            <div className="home-stats-grid">
              <div className="home-stat-card nisab-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h4 className="stat-label">Total Nisab</h4>
                  <div className="stat-value">RM {nisabValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <p className="stat-note">Based on current gold price</p>
                </div>
              </div>

              <div className="home-stat-card rate-card">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <h4 className="stat-label">Zakat Rate</h4>
                  <div className="stat-value">2.5%</div>
                  <p className="stat-note">According to syariah</p>
                </div>
              </div>

              <div className="home-stat-card status-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h4 className="stat-label">System Status</h4>
                  <div className="stat-value">Ready to Calculate</div>
                  <p className="stat-note">All systems operational</p>
                </div>
              </div>
            </div>
          </section>

          <section className="home-learn-section">
            <div className="home-learn-header">
              <h2>Learn About Zakat</h2>
              <p>Understand zakat, business zakat, and the benefits of paying zakat.</p>
            </div>

            <div className="home-learn-grid">
              <article className="home-learn-card">
                <div className="home-learn-icon">🕌</div>
                <h3>What is Zakat?</h3>
                <p>
                  Zakat is a compulsory charitable contribution in Islam for Muslims who meet the required financial threshold (nisab). It helps purify wealth and supports those in need, promoting fairness and social welfare.
                </p>
              </article>

              <article className="home-learn-card">
                <div className="home-learn-icon">🧮</div>
                <h3>What is Business Zakat?</h3>
                <p>
                  Business zakat (Zakat Perniagaan) is a mandatory zakat imposed on business assets and profits that meet the nisab requirement. It is calculated annually.
                </p>
              </article>

              <article className="home-learn-card">
                <div className="home-learn-icon">✨</div>
                <h3>Benefits of Paying Zakat</h3>
                <ul className="home-learn-list">
                  <li>✅ Purifies wealth and income</li>
                  <li>✅ Helps people in need</li>
                  <li>✅ Strengthens the Muslim community</li>
                  <li>✅ Encourages financial discipline</li>
                  <li>✅ Brings blessings (barakah)</li>
                </ul>
              </article>
            </div>
          </section>
        </main>
      </div>
      <SidebarDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
