import React from "react";

export default function TransferStatusCard({ transfer, onBack }) {
  return (
    <div className="card">
      <h2 className="card-title">Bank to Zakat Transfer</h2>

      <div className="info-row">
        <span className="label">Transfer ID</span>
        <span className="value">{transfer.transferId}</span>
      </div>

      <div className="info-row">
        <span className="label">Bank</span>
        <span className="value">{transfer.bankName}</span>
      </div>

      <div className="info-row">
        <span className="label">Zakat Organization</span>
        <span className="value">{transfer.zakatOrganization}</span>
      </div>

      <div className="info-row">
        <span className="label">Transfer Status</span>
        <span className="value status-success">{transfer.status}</span>
      </div>

      <div className="button-group">
        <button className="btn btn-gold" onClick={onBack}>
          Back to Result
        </button>
      </div>
    </div>
  );
}