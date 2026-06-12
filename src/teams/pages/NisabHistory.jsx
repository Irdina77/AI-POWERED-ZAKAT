import { useNavigate } from "react-router-dom";
import "../Styles/AdminDashboard.css";

const historyData = [
  {
    date: "2026-05-22",
    oldValue: 42000,
    newValue: 42500,
    currency: "MYR",
    updatedBy: "Admin A",
  },
  {
    date: "2026-04-18",
    oldValue: 41500,
    newValue: 42000,
    currency: "MYR",
    updatedBy: "Admin B",
  },
  {
    date: "2026-03-10",
    oldValue: 41000,
    newValue: 41500,
    currency: "MYR",
    updatedBy: "Admin C",
  },
];

export default function NisabHistory() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-page">
      <section className="admin-section">
        <div className="page-top-row">
          <button className="back-button" onClick={() => navigate(-1)}>
            <span className="back-icon">←</span>
            Back
          </button>
          <h1 className="admin-page-title">Nisab Rate History</h1>
        </div>

        <div className="users-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date Updated</th>
                <th>Old Nisab Value</th>
                <th>New Nisab Value</th>
                <th>Currency</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((record) => (
                <tr key={`${record.date}-${record.updatedBy}`}>
                  <td>{record.date}</td>
                  <td>RM {record.oldValue.toLocaleString()}</td>
                  <td>RM {record.newValue.toLocaleString()}</td>
                  <td>{record.currency}</td>
                  <td>{record.updatedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
