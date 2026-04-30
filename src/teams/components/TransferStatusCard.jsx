import React from "react";

export default function TransferStatusCard({ transfer, onBack }) {
  return (
    <div className="card transfer-card">
      <div className="transfer-card-top">
        <div>
          <h2 className="card-title">Bank to Zakat Transfer</h2>
          <p className="transfer-card-subtitle">
            Confirm your payment details and receive premium transfer confirmation.
          </p>
        </div>
        <span className="status-badge status-success">{transfer.status}</span>
      </div>

      <div className="transfer-detail-row">
        <span className="label">Transfer ID</span>
        <span className="value">{transfer.transferId}</span>
      </div>

      <div className="transfer-detail-row">
        <span className="label">Bank</span>
        <span className="value">{transfer.bankName}</span>
      </div>

      <div className="transfer-detail-row">
        <span className="label">Zakat Organization</span>
        <span className="value">{transfer.zakatOrganization}</span>
      </div>

      <div className="transfer-detail-row last-row">
        <span className="label">Current Status</span>
        <span className="value status-success">{transfer.status}</span>
      </div>

      <div className="transfer-notice-box">
        <p>
          Your transfer is secured and monitored with premium zakat settlement flow. Expect instant confirmation once the transfer clears.
        </p>
      </div>

      <div className="button-group">
        <button className="btn btn-gold" onClick={onBack}>
          Back to Result
        </button>
      </div>
    </div>
  );
}