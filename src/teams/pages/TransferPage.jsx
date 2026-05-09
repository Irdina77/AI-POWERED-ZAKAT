import React from "react";
import { motion } from "framer-motion";
import TransferStatusCard from "../../../src/teams/components/TransferStatusCard";

export default function TransferPage({ transfer, onBack }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="transfer-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="transfer-page-header" variants={itemVariants}>
        <div className="header-content">
          <motion.div
            className="success-icon-container"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            ✓
          </motion.div>
          <h1 className="page-title transfer-page-title">Transfer Status</h1>
        </div>
        <p className="page-subtitle transfer-page-subtitle">
          Your zakat transfer is being processed securely. Review the confirmation details below.
        </p>
      </motion.div>

      <motion.div className="transfer-page-shell" variants={itemVariants}>
        <TransferStatusCard transfer={transfer} onBack={onBack} />
      </motion.div>
    </motion.div>
  );
}