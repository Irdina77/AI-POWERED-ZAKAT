import React from "react";
import { motion } from "framer-motion";
import PaymentCard from "../../../src/teams/components/PaymentCard";

export default function PaymentPage({ payment, onPay, onBack }) {
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
      className="payment-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="payment-page-header"
        variants={itemVariants}
      >
        <h1 className="page-title payment-page-title">Payment Gateway</h1>
        <p className="page-subtitle payment-page-subtitle">
          Complete your zakat payment with a secure, polished checkout experience.
        </p>
      </motion.div>

      <motion.div
        className="payment-page-shell"
        variants={itemVariants}
      >
        <PaymentCard payment={payment} onPay={onPay} onBack={onBack} />
      </motion.div>
    </motion.div>
  );
}