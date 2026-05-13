import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { getTranslationSection } from "../translations/translations";

export default function PaymentCard({ payment, onPay, onBack }) {
  const { language } = useLanguage();
  const t = getTranslationSection(language, 'paymentPage');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayClick = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onPay();
      setIsProcessing(false);
    }, 600);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="card payment-card payment-card-premium"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.div
        className="payment-card-top premium-card-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <h2 className="card-title payment-card-title">{t.paymentDetails}</h2>
          <p className="payment-card-subtitle">
            {t.secureSettlement}
          </p>
        </div>
        <motion.span
          className={`status-badge premium-status-badge ${
            payment.status === "Success" ? "status-success" : "status-pending"
          }`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          {payment.status}
        </motion.span>
      </motion.div>

      <motion.div
        className="payment-details-grid premium-details-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="payment-detail-row premium-detail-row" variants={rowVariants}>
          <div className="detail-icon">🔐</div>
          <div className="detail-content">
            <span className="label">{t.paymentId}</span>
            <span className="value">{payment.paymentId}</span>
          </div>
        </motion.div>

        <motion.div className="payment-detail-row premium-detail-row" variants={rowVariants}>
          <div className="detail-icon">💳</div>
          <div className="detail-content">
            <span className="label">{t.gateway}</span>
            <span className="value">{payment.gateway}</span>
          </div>
        </motion.div>

        <motion.div className="payment-detail-row premium-detail-row" variants={rowVariants}>
          <div className="detail-icon">🏦</div>
          <div className="detail-content">
            <span className="label">{t.connectedBank}</span>
            <span className="value">FPX / Online Banking</span>
          </div>
        </motion.div>

        <motion.div
          className="payment-detail-row premium-detail-row"
          variants={rowVariants}
        >
          <div className="detail-icon">✓</div>
          <div className="detail-content">
            <span className="label">{t.paymentStatus}</span>
            <span className="value payment-status-value">{payment.status}</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="amount-box payment-amount-box premium-amount-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="amount-header">
          <p className="amount-label">{t.amountToPay}</p>
          <span className="amount-icon">💰</span>
        </div>
        <motion.h2
          className="amount-value premium-amount-value"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          RM {Number(payment.amount).toFixed(2)}
        </motion.h2>
      </motion.div>

      <motion.div
        className="security-info-box premium-security-box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ y: -2 }}
      >
        <div className="security-icon">🛡️</div>
        <div className="security-content">
          <p className="security-title">{t.securePayment}</p>
          <p className="security-text">
            Your payment is encrypted and processed through a trusted zakat partner. All transactions are PCI DSS compliant.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="payment-actions premium-payment-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.button
          className={`btn btn-dark btn-gradient premium-pay-btn ${
            isProcessing ? "btn-loading" : ""
          }`}
          onClick={handlePayClick}
          disabled={isProcessing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="btn-icon">💳</span>
          <span className="btn-text">{isProcessing ? "Processing..." : "Pay Now"}</span>
          {isProcessing && <span className="btn-spinner"></span>}
        </motion.button>

        <motion.button
          className="btn btn-outline premium-back-btn"
          onClick={onBack}
          disabled={isProcessing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="btn-icon">←</span>
          <span className="btn-text">Back</span>
        </motion.button>
      </motion.div>

      <motion.div
        className="trust-badges premium-trust-badges"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        variants={containerVariants}
      >
        <motion.div className="trust-badge" variants={rowVariants}>
          <span className="badge-icon">🔒</span>
          <span className="badge-text">Secure Payment</span>
        </motion.div>
        <motion.div className="trust-badge" variants={rowVariants}>
          <span className="badge-icon">⚡</span>
          <span className="badge-text">Instant Confirmation</span>
        </motion.div>
        <motion.div className="trust-badge" variants={rowVariants}>
          <span className="badge-icon">✓</span>
          <span className="badge-text">Trusted Zakat Partner</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}