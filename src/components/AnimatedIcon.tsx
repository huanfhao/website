import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedIconProps {
  icon: React.ReactNode;
  className?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ icon, className = '' }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.2, rotate: 10 }}
      whileTap={{ scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {icon}
    </motion.div>
  );
}; 