import React from "react";

export default function ResultCard({ result }) {
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
    </div>
  );
}