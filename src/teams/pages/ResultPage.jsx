import React from "react";
import { motion } from "framer-motion";
import ResultCard from "../../../src/teams/components/ResultCard";
import ActionButtons from "../../../src/teams/components/ActionButtons";

export default function ResultPage({ result, onSave, onReset, onProceed }) {
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
      className="page-container result-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="page-title result-page-title">Zakat Result</h1>
      </motion.div>

      <motion.div variants={itemVariants}>
        <ResultCard result={result} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ActionButtons
          onSave={onSave}
          onReset={onReset}
          onProceed={onProceed}
        />
      </motion.div>
    </motion.div>
  );
}