import { useNavigate, useParams } from "react-router-dom";
import "../Styles/AdminDashboard.css";

const userRecords = {
  U001: {
    id: "#U001",
    email: "user@example.com",
    status: "Active",
    joined: "2026-05-15",
  },
  U002: {
    id: "#U002",
    email: "another@example.com",
    status: "Active",
    joined: "2026-05-10",
  },
  U003: {
    id: "#U003",
    email: "inactive@example.com",
    status: "Inactive",
    joined: "2026-04-20",
  },
};

export default function UserDetail() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const user = userRecords[userId] || {
    id: `#${userId}`,
    email: "notfound@example.com",
    status: "Unknown",
    joined: "-",
  };

  return (
    <div className="admin-dashboard-page">
      <section className="admin-section">
        <div className="page-top-row">
          <button className="back-button" onClick={() => navigate(-1)}>
            <span className="back-icon">←</span>
            Back to Dashboard
          </button>
          <h1 className="admin-page-title">User Detail</h1>
        </div>

        <div className="detail-card">
          <div className="detail-row">
            <span className="detail-label">User ID</span>
            <span>{user.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span>{user.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status</span>
            <span>{user.status}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Joined Date</span>
            <span>{user.joined}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
