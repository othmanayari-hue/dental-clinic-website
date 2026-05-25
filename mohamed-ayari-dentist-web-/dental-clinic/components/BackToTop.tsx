'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Retour en haut"
          className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #0B2235 0%, #071929 100%)',
            border: '1px solid rgba(6,182,212,0.3)',
            boxShadow: '0 8px 24px rgba(7,25,41,0.4), 0 0 0 1px rgba(6,182,212,0.1)',
          }}
        >
          <ArrowUp className="w-5 h-5 text-cyan-400" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
