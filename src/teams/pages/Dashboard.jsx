import { useEffect, useRef, useState } from "react";
import FullScreenPanel from "../components/FullScreenPanel";
import "../Styles/Dashboard.css";

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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openPanel, setOpenPanel] = useState(null);
  const [showSettingMenu, setShowSettingMenu] = useState(false);
  const settingMenuRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
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
    <div className="dashboard-page">
      <nav className="dashboard-topbar">
        <div className="dashboard-topbar-inner">
          <div className="dashboard-brand">
            <div className="brand-logo">✦</div>
            <span className="brand-text">ZAKAT NOW SYSTEM</span>
          </div>

          <div className="dashboard-menu">
            <button className="menu-link active">System Data</button>
            <button className="menu-link" onClick={onGoNisab}>
              Nisab Management
            </button>
          </div>

          <div className="dashboard-right">
            <span className="top-icon">🔔</span>

            <div
              className="setting-dropdown-wrapper"
              ref={settingMenuRef}
            >
              <span
                className="top-icon"
                onClick={() => setShowSettingMenu((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                ⚙️
              </span>

              {showSettingMenu && (
                <div className="setting-dropdown-menu">
                  <button
                    className="setting-dropdown-item"
                    onClick={handleLogout}
                  >
                    🚪
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            <div className="admin-box">
              <div className="admin-avatar">👤</div>
              <div>
                <div className="admin-name">Admin</div>
                <div className="admin-role">Super Admin</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="dashboard-container">
        <div className="dashboard-meta-row">
          <span className="admin-badge">ADMIN DASHBOARD</span>

          <div className="meta-right">
            <span>{formattedDate}</span>
            <span>{formattedTime}</span>
          </div>
        </div>

        <header className="dashboard-header dashboard-header-centered">
          <h1> System Data</h1>
          <p className="dashboard-subtitle">
            In every provision we are given, 2.5% is the right of others.
          </p>
        </header>

        <div className="dashboard-stats-grid">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon green">👥</div>
            <div>
              <div className="dashboard-stat-title">Total Users</div>
              <div className="dashboard-stat-value">{totalUsers}</div>
              <div className="dashboard-stat-note">↑ 12 this month</div>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon gold">🧮</div>
            <div>
              <div className="dashboard-stat-title">Current Nisab</div>
              <div className="dashboard-stat-value">
                RM
                {Number(currentNisab.value).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="dashboard-stat-note">
                Updated {currentNisabUpdatedAt}
              </div>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon purple">💵</div>
            <div>
              <div className="dashboard-stat-title">Zakat This Year</div>
              <div className="dashboard-stat-value">
                RM
                {Number(zakatThisYear).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="dashboard-stat-note">
                Based on successful payments
              </div>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon gold">💳</div>
            <div>
              <div className="dashboard-stat-title">Successful Payments</div>
              <div className="dashboard-stat-value">{successfulPayments}</div>
              <div className="dashboard-stat-note">
                {pendingPayments} pending payments
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-main-grid">
          <div className="dashboard-left-column">
            <section className="dashboard-card dashboard-overview-card">
              <div className="dashboard-card-header">
                <h2>⚡ Quick Overview</h2>
                <span className="dashboard-card-caret">⌄</span>
              </div>

              <div className="dashboard-overview-grid">
                <div className="dashboard-overview-block">
                  <div className="overview-line strong">
                    Active Users: {users.filter((u) => u.status === "Active").length}
                  </div>

                  <div className="overview-line">
                    Pending Payments: {pendingPayments}
                  </div>
                </div>

                <div className="dashboard-overview-divider" />

                <div className="dashboard-overview-block">
                  <div className="overview-line strong">
                    Latest Payment: RM{payments[0]?.amount ?? 0}
                  </div>

                  <div className="overview-line">
                    Gold Price: RM{Number(currentNisab.goldPrice).toFixed(2)}/g
                  </div>
                </div>
              </div>
            </section>

            <div className="dashboard-records-list">
              <div
                className="dashboard-record-row"
                onClick={() => setOpenPanel("users")}
              >
                <div className="dashboard-record-left">
                  <div className="dashboard-record-icon">👥</div>
                  <div>
                    <div className="dashboard-record-title">Registered Users</div>
                    <div className="dashboard-record-desc">
                      Manage and monitor user accounts
                    </div>
                  </div>
                </div>

                <div className="dashboard-record-right">
                  <div className="dashboard-record-right-top">
                    5 new registrations this week
                  </div>
                  <div className="dashboard-record-right-bottom">
                    Total: {totalUsers} users
                  </div>
                </div>

                <div className="dashboard-record-arrow">
                  ➜
                </div>
              </div>

              <div
                className="dashboard-record-row"
                onClick={() => setOpenPanel("calculations")}
              >
                <div className="dashboard-record-left">
                  <div className="dashboard-record-icon">🧮</div>
                  <div>
                    <div className="dashboard-record-title">
                      Calculation Records
                    </div>
                    <div className="dashboard-record-desc">
                      View and manage zakat calculations
                    </div>
                  </div>
                </div>

                <div className="dashboard-record-right">
                  <div className="dashboard-record-right-top">
                    12 new calculations this week
                  </div>
                  <div className="dashboard-record-right-bottom">
                    Total: {calculations.length} records
                  </div>
                </div>

                <div className="dashboard-record-arrow">
                  ➜
                </div>
              </div>

              <div
                className="dashboard-record-row"
                onClick={() => setOpenPanel("payments")}
              >
                <div className="dashboard-record-left">
                  <div className="dashboard-record-icon">💳</div>
                  <div>
                    <div className="dashboard-record-title">Payment Records</div>
                    <div className="dashboard-record-desc">
                      Track and manage payment transactions
                    </div>
                  </div>
                </div>

                <div className="dashboard-record-right">
                  <div className="dashboard-record-right-top">
                    10 new payments this week
                  </div>
                  <div className="dashboard-record-right-bottom">
                    Total: {payments.length} payments
                  </div>
                </div>

                <div className="dashboard-record-arrow">
                  ➜
                </div>
              </div>
            </div>
          </div>

          <aside className="dashboard-card dashboard-activity-card">
            <div className="dashboard-card-header">
              <h2>Recent Activity</h2>
            </div>

            <div className="dashboard-activity-list">
              {activities.map((item) => (
                <div key={item.id} className="dashboard-activity-item">
                  <div className={`dashboard-activity-icon ${item.type}`}>
                    <ActivityIcon type={item.type} />
                  </div>

                  <div className="dashboard-activity-text">
                    <div className="dashboard-activity-title">{item.title}</div>
                    <div className="dashboard-activity-subtitle">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {openPanel === "users" && (
        <FullScreenPanel
          title="Registered Users"
          columns={["ID", "Name", "Email", "Status", "Registered At"]}
          rows={users.map((u) => [
            u.id,
            u.name,
            u.email,
            u.status,
            u.registeredAt,
          ])}
          onClose={() => setOpenPanel(null)}
        />
      )}

      {openPanel === "calculations" && (
        <FullScreenPanel
          title="Calculation Records"
          columns={["ID", "Name", "Method", "Amount", "Status", "Created At"]}
          rows={calculations.map((c) => [
            c.id,
            c.name,
            c.method,
            `RM ${c.amount}`,
            c.status,
            c.createdAt,
          ])}
          onClose={() => setOpenPanel(null)}
        />
      )}

      {openPanel === "payments" && (
        <FullScreenPanel
          title="Payment Records"
          columns={["ID", "Name", "Gateway", "Amount", "Status", "Paid At"]}
          rows={payments.map((p) => [
            p.id,
            p.name,
            p.gateway,
            `RM ${p.amount}`,
            p.status,
            p.paidAt,
          ])}
          onClose={() => setOpenPanel(null)}
        />
      )}

      <footer className="dashboard-footer">
        © {currentNisab.year} Zakat Organisation Portal
      </footer>
    </div>
  );
}