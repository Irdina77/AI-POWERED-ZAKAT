import React from "react";

export default function PaymentCard({ payment, onPay, onBack }) {
  return (
    <div className="card payment-card">
      <div className="payment-card-top">
        <div>
          <h2 className="card-title">Payment Details</h2>
          <p className="payment-card-subtitle">
            Secure settlement for your zakat payment through the selected gateway.
          </p>
        </div>
        <span className={`status-badge ${payment.status === "Success" ? "status-success" : "status-pending"}`}>
          {payment.status}
        </span>
      </div>

      <div className="payment-detail-row">
        <span className="label">Payment ID</span>
        <span className="value">{payment.paymentId}</span>
      </div>

      <div className="payment-detail-row">
        <span className="label">Gateway</span>
        <span className="value">{payment.gateway}</span>
      </div>

      <div className="payment-detail-row">
        <span className="label">Connected Bank</span>
        <span className="value">FPX / Online Banking</span>
      </div>

      <div className="amount-box payment-amount-box">
        <p className="amount-label">Amount to Pay</p>
        <h2 className="amount-value">RM {Number(payment.amount).toFixed(2)}</h2>
      </div>

      <div className="payment-actions">
        <button className="btn btn-dark" onClick={onPay}>
          Pay Now
        </button>

        <button className="btn btn-outline" onClick={onBack}>
          Back
        </button>
      </div>

      <div className="payment-help-text">
        Your payment is routed through a trusted zakat partner. Complete the payment to receive instant transfer confirmation.
      </div>
    </div>
  );
}