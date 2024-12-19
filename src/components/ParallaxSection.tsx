import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  offset = 50,
  className = ''
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -offset]);

  return (
    <motion.div
      style={{ y }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}; 