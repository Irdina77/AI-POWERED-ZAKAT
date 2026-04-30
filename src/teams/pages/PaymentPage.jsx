import React from "react";
import PaymentCard from "../../../src/teams/components/PaymentCard";

export default function PaymentPage({ payment, onPay, onBack }) {
  return (
    <div className="page-container">
      <div className="payment-page-header">
        <h1 className="page-title">Payment Gateway</h1>
        <p className="page-subtitle">
          Complete your zakat payment with a secure, polished checkout experience.
        </p>
      </div>

      <div className="payment-page-shell">
        <PaymentCard payment={payment} onPay={onPay} onBack={onBack} />
      </div>
    </div>
  );
}