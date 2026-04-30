import React from "react";

export default function ResultCard({ result }) {
  // 🔥 AI LOGIC
  const getAIInsight = () => {
    if (!result) return "Enter your data to get AI insights.";

    const zakat = Number(result.zakatAmount);
    const total = Number(result.total || 0);
    const nisabStatus = result.nisabStatus;

    if (nisabStatus === "Below Nisab") {
      return "Your business has not reached nisab. Consider increasing your savings or revenue.";
    }

    if (total > 0 && zakat > 0 && total < 50000) {
      return "Your zakat is relatively low. You may optimize your financial planning.";
    }

    if (zakat > 1000) {
      return "Your financial position is strong. You are eligible for zakat payment.";
    }

    return "Your financial condition is stable.";
  };

  const getResultNote = () => {
    if (!result) return "Complete the calculator to see your summary.";
    if (result.nisabStatus === "Eligible") {
      return "Your business has reached the nisab threshold. You should proceed to payment if you wish to settle your zakat now.";
    }
    return "Your business has not reached nisab yet. Continue monitoring your balance and recalculate when your assets grow.";
  };

  return (
    <div className="card result-summary-card">
      <div className="summary-header">
        <div>
          <h2 className="card-title">Calculation Summary</h2>
          <p className="summary-subtitle">A clear breakdown of your zakat result and next steps.</p>
        </div>
        <span className={`status-chip ${result.nisabStatus === "Eligible" ? "status-success" : "status-pending"}`}>
          {result.nisabStatus}
        </span>
      </div>

      <div className="summary-grid">
        <div className="summary-item">
          <span className="item-label">Zakat Amount</span>
          <span className="item-value">RM {Number(result.zakatAmount).toFixed(2)}</span>
        </div>

        <div className="summary-item">
          <span className="item-label">Calculation Method</span>
          <span className="item-value">{result.method}</span>
        </div>

        <div className="summary-item">
          <span className="item-label">Payment Status</span>
          <span className="item-value">{result.nisabStatus === "Eligible" ? "Payable" : "Not due"}</span>
        </div>

        <div className="summary-item">
          <span className="item-label">Recommended Action</span>
          <span className="item-value">{result.nisabStatus === "Eligible" ? "Proceed to pay" : "Recalculate later"}</span>
        </div>
      </div>

      <div className="insight-box">
        <p className="insight-title">🧠 Smart insight</p>
        <p>{getAIInsight()}</p>
      </div>

      <div className="summary-note">{getResultNote()}</div>
    </div>
  );
}