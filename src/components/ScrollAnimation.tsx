import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideIn' | 'scaleUp';
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ 
  children, 
  animation = 'fadeIn' 
}) => {
  const controls = useAnimation();
  
  // 使用 Intersection Observer API
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  useEffect(() => {
    const element = document.getElementById('scroll-animation');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const variants = {
    fadeIn: {
      visible: { opacity: 1, y: 0 },
      hidden: { opacity: 0, y: 50 }
    },
    slideIn: {
      visible: { opacity: 1, x: 0 },
      hidden: { opacity: 0, x: -100 }
    },
    scaleUp: {
      visible: { opacity: 1, scale: 1 },
      hidden: { opacity: 0, scale: 0.8 }
    }
  };

  return (
    <motion.div
      id="scroll-animation"
      animate={controls}
      initial="hidden"
      variants={variants[animation]}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}; 