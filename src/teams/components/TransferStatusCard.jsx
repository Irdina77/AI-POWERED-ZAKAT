import React from "react";
import { motion } from "framer-motion";

export default function TransferStatusCard({ transfer, onBack }) {
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  return (
    <motion.div
      className="card transfer-card transfer-card-premium"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.div
        className="transfer-card-top premium-transfer-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <h2 className="card-title transfer-card-title">Bank to Zakat Transfer</h2>
          <p className="transfer-card-subtitle">
            Confirm your payment details and receive premium transfer confirmation.
          </p>
        </div>
        <motion.span
          className="status-badge premium-success-badge status-success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
          <span className="badge-checkmark">✓</span>
          <span className="badge-text">{transfer.status}</span>
        </motion.span>
      </motion.div>

      <motion.div
        className="transfer-details-grid premium-transfer-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="transfer-detail-row premium-transfer-row" variants={rowVariants}>
          <div className="transfer-icon">🔐</div>
          <div className="transfer-detail-content">
            <span className="label">Transfer ID</span>
            <span className="value">{transfer.transferId}</span>
          </div>
        </motion.div>

        <motion.div className="transfer-detail-row premium-transfer-row" variants={rowVariants}>
          <div className="transfer-icon">🏦</div>
          <div className="transfer-detail-content">
            <span className="label">Bank</span>
            <span className="value">{transfer.bankName}</span>
          </div>
        </motion.div>

        <motion.div className="transfer-detail-row premium-transfer-row" variants={rowVariants}>
          <div className="transfer-icon">🕌</div>
          <div className="transfer-detail-content">
            <span className="label">Zakat Organization</span>
            <span className="value">{transfer.zakatOrganization}</span>
          </div>
        </motion.div>

        <motion.div className="transfer-detail-row premium-transfer-row last-row" variants={rowVariants}>
          <div className="transfer-icon">✓</div>
          <div className="transfer-detail-content">
            <span className="label">Current Status</span>
            <span className="value status-success transfer-status-value">{transfer.status}</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="transfer-notice-box premium-transfer-notice"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ y: -2 }}
      >
        <div className="notice-icon">🔒</div>
        <div className="notice-content">
          <p className="notice-title">Secure Transfer Confirmation</p>
          <p>
            Your transfer is secured and monitored with premium zakat settlement flow. Expect instant confirmation once the transfer clears.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="transfer-success-badges premium-transfer-badges"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        variants={containerVariants}
      >
        <motion.div className="transfer-badge" variants={rowVariants}>
          <span className="badge-icon">✓</span>
          <span className="badge-label">Payment Successfully Processed</span>
        </motion.div>
        <motion.div className="transfer-badge" variants={rowVariants}>
          <span className="badge-icon">⚡</span>
          <span className="badge-label">Instant Confirmation</span>
        </motion.div>
        <motion.div className="transfer-badge" variants={rowVariants}>
          <span className="badge-icon">🔐</span>
          <span className="badge-label">Trusted Secure Transfer</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="button-group premium-transfer-button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className="btn btn-dark btn-gradient premium-back-btn"
          onClick={onBack}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="btn-icon">←</span>
          <span className="btn-text">Back to Result</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}