'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return p + Math.random() * 18 + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #04111F 0%, #071929 50%, #0B2235 100%)' }}
        >
          {/* Ambient blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }}
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)' }}
            />
          </div>

          {/* Logo / Tooth SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            {/* Tooth Icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.05) 100%)',
                  border: '1px solid rgba(6,182,212,0.3)',
                  boxShadow: '0 0 40px rgba(6,182,212,0.2)',
                }}
              >
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <path
                    d="M22 4C17.5 4 14 7 12 10C10 13 9 17 9 20C9 24 10 28 11 31C12 34 13.5 40 16 40C18.5 40 19 37 20 34C20.5 32.5 21 31 22 31C23 31 23.5 32.5 24 34C25 37 25.5 40 28 40C30.5 40 32 34 33 31C34 28 35 24 35 20C35 17 34 13 32 10C30 7 26.5 4 22 4Z"
                    fill="url(#toothGrad)"
                    stroke="rgba(6,182,212,0.6)"
                    strokeWidth="1"
                  />
                  <defs>
                    <linearGradient id="toothGrad" x1="9" y1="4" x2="35" y2="40" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#22D3EE" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              {/* Glow ring */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-3xl border border-cyan-400/30"
              />
            </motion.div>

            {/* Clinic name */}
            <div className="text-center space-y-2">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white/50 text-xs font-semibold tracking-[0.3em] uppercase font-mono"
              >
                Cabinet Dentaire
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-white text-2xl font-display font-bold"
                style={{ letterSpacing: '-0.01em' }}
              >
                Dr Ayari Mohamed
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-cyan-400 text-xs font-medium tracking-[0.2em] uppercase"
              >
                Orthodontie · Hammam Lif
              </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-48 h-[2px] rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <motion.div
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #06B6D4, #22D3EE)',
                  height: '100%',
                  borderRadius: '9999px',
                }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
