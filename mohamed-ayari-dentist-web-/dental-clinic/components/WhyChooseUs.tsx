'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Cpu, HeartHandshake, UserCheck, Clock, FlaskConical } from 'lucide-react';

const easing = [0.22, 1, 0.36, 1];

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Sécurité & Stérilisation',
    description: 'Protocoles stricts de stérilisation et d\'hygiène pour garantir votre protection totale à chaque visite.',
    color: '#06B6D4',
  },
  {
    icon: Cpu,
    title: 'Technologies Modernes',
    description: 'Équipements de dernière génération pour des diagnostics précis et des traitements moins invasifs.',
    color: '#C9A84C',
  },
  {
    icon: HeartHandshake,
    title: 'Approche Bienveillante',
    description: 'Une équipe à l\'écoute qui adapte chaque soin à votre sensibilité, vos peurs et vos besoins spécifiques.',
    color: '#22D3EE',
  },
  {
    icon: UserCheck,
    title: 'Suivi Personnalisé',
    description: 'Un suivi rigoureux et continu pour chaque patient, avec un dossier médical complet et des rappels réguliers.',
    color: '#0891B2',
  },
  {
    icon: Clock,
    title: 'Disponibilité & Réactivité',
    description: 'Prise de rendez-vous rapide et gestion des urgences pour ne jamais vous laisser souffrir inutilement.',
    color: '#C9A84C',
  },
  {
    icon: FlaskConical,
    title: 'Expertise Reconnue',
    description: 'Plus de 15 années de pratique clinique rigoureuse au service de la santé bucco-dentaire de la région.',
    color: '#06B6D4',
  },
];

export default function WhyChooseUs() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #04111F 0%, #071929 50%, #0B2235 100%)' }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easing }}
          className="text-center mb-16"
        >
          <div className="section-tag-gold mx-auto mb-4">
            <ShieldCheck className="w-3 h-3" />
            Pourquoi nous choisir
          </div>
          <h2
            className="text-4xl lg:text-5xl font-display font-bold text-white mb-5 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            L&apos;excellence dentaire,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #67E8F9 0%, #06B6D4 100%)' }}
            >
              à votre service
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Nous plaçons votre confort, votre sécurité et votre sourire au cœur de chaque décision médicale.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, description, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: easing }}
              whileHover={{ y: -6 }}
              className="group relative p-8 rounded-3xl overflow-hidden cursor-default transition-all duration-500"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Hover bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${color}0D 0%, ${color}05 100%)`,
                  borderColor: `${color}20`,
                }}
              />
              {/* Top accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3
                  className="text-white font-display font-semibold text-xl mb-3"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed" style={{ lineHeight: '1.75' }}>
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
