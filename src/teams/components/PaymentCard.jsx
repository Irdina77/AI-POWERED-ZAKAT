import React from "react";

export default function PaymentCard({ payment, onPay, onBack }) {
  return (
    <div className="card">
      <h2 className="card-title">Payment Details</h2>

      <div className="info-row">
        <span className="label">Payment ID</span>
        <span className="value">{payment.paymentId}</span>
      </div>

      <div className="info-row">
        <span className="label">Gateway</span>
        <span className="value">{payment.gateway}</span>
      </div>

      <div className="info-row">
        <span className="label">Status</span>
        <span className="value status-pending">{payment.status}</span>
      </div>

      <div className="amount-box">
        <p className="amount-label">Amount to Pay</p>
        <h2 className="amount-value">RM {payment.amount}</h2>
      </div>

      <div className="button-group">
        <button className="btn btn-dark" onClick={onPay}>
          Pay Now
        </button>

        <button className="btn btn-outline" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}