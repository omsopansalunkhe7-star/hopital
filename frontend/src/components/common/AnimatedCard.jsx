import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedCard - Reusable card component with fade-in and hover animations
 */
const AnimatedCard = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
      className={`bg-white rounded-lg shadow-md transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;