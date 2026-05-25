'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ShieldCheck, Stethoscope, Award, Users, Clock4 } from 'lucide-react';

const easing = [0.22, 1, 0.36, 1];

const indicators = [
  {
    icon: Star,
    value: '4.3/5',
    label: 'Note moyenne',
    sublabel: 'Basée sur les avis patients',
    color: '#C9A84C',
    bg: 'rgba(201,168,76,0.08)',
    border: 'rgba(201,168,76,0.2)',
  },
  {
    icon: Users,
    value: '500+',
    label: 'Patients traités',
    sublabel: 'Confiance établie',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.2)',
  },
  {
    icon: Award,
    value: '15+',
    label: 'Années d\'expérience',
    sublabel: 'Expertise reconnue',
    color: '#22D3EE',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.2)',
  },
  {
    icon: Stethoscope,
    value: '7',
    label: 'Spécialités',
    sublabel: 'Soins complets',
    color: '#0891B2',
    bg: 'rgba(8,145,178,0.08)',
    border: 'rgba(8,145,178,0.2)',
  },
  {
    icon: ShieldCheck,
    value: '100%',
    label: 'Satisfaction',
    sublabel: 'Engagement qualité',
    color: '#C9A84C',
    bg: 'rgba(201,168,76,0.08)',
    border: 'rgba(201,168,76,0.2)',
  },
  {
    icon: Clock4,
    value: '24h',
    label: 'Urgences disponibles',
    sublabel: 'Toujours là pour vous',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.2)',
  },
];

export default function TrustIndicators() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #071929 0%, #04111F 100%)' }}
    >
      {/* Subtle dividers */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {indicators.map(({ icon: Icon, value, label, sublabel, color, bg, border }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center p-5 rounded-2xl cursor-default transition-all duration-300"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <p
                className="font-mono font-bold text-xl leading-none mb-1"
                style={{ color }}
              >
                {value}
              </p>
              <p className="text-white font-semibold text-xs leading-tight mb-0.5">{label}</p>
              <p className="text-white/40 text-[10px] leading-tight">{sublabel}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
