import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {children}
    </motion.div>
  );
}; 