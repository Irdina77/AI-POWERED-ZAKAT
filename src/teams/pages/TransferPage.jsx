import React from "react";
import TransferStatusCard from "../../../src/teams/components/TransferStatusCard";

export default function TransferPage({ transfer, onBack }) {
  return (
    <div className="page-container">
      <div className="transfer-page-header">
        <h1 className="page-title">Transfer Status</h1>
        <p className="page-subtitle">
          Your zakat transfer is being processed securely. Review the confirmation details below.
        </p>
      </div>

      <div className="transfer-page-shell">
        <TransferStatusCard transfer={transfer} onBack={onBack} />
      </div>
    </div>
  );
}