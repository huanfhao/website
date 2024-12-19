import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  className = '',
  circle = false
}) => {
  return (
    <motion.div
      className={`bg-gray-200 ${circle ? 'rounded-full' : 'rounded'} ${className}`}
      style={{ width, height }}
      animate={{
        opacity: [0.5, 1, 0.5],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    />
  );
}; 