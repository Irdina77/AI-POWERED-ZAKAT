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

  return (
    <div className="card">
      <h2 className="card-title">Calculation Summary</h2>

      <div className="info-row">
        <span className="label">Method</span>
        <span className="value">{result.method}</span>
      </div>

      <div className="info-row">
        <span className="label">Nisab Status</span>
        <span className="value">{result.nisabStatus}</span>
      </div>

      <div className="amount-box">
        <p className="amount-label">Zakat Amount</p>
        <h2 className="amount-value">RM {result.zakatAmount}</h2>
      </div>

      {/* 🔥 AI INSIGHT (NEW) */}
      <div className="ai-insight">
        🤖 AI Insight: {getAIInsight()}
      </div>
    </div>
  );
}