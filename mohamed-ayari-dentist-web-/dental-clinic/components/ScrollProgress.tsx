'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        originX: 0,
        zIndex: 100,
        background: 'linear-gradient(90deg, #06B6D4 0%, #C9A84C 50%, #06B6D4 100%)',
        backgroundSize: '200% 100%',
      }}
    />
  );
}
