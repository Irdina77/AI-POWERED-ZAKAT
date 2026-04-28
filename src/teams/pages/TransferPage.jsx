import React from "react";
import TransferStatusCard from "../../../src/teams/components/TransferStatusCard";

export default function TransferPage({ transfer, onBack }) {
  return (
    <div className="page-container">
      <h1 className="page-title">Transfer Status</h1>

      <TransferStatusCard transfer={transfer} onBack={onBack} />
    </div>
  );
}