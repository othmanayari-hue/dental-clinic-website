'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Shield,
  Sparkles,
  AlignCenter,
  Layers,
  Scissors,
  Zap,
  ArrowRight,
} from 'lucide-react';

const easing = [0.22, 1, 0.36, 1];

const services = [
  {
    id: 'restauratrice',
    title: 'Dentisterie Restauratrice',
    description: 'Restauration précise des dents abîmées pour retrouver fonctionnalité et esthétique naturelle.',
    items: ['Traitement des caries', 'Restauration des dents abîmées', 'Soins conservateurs de haute précision'],
    Icon: Layers,
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.04) 100%)',
    borderGlow: 'rgba(6,182,212,0.3)',
  },
  {
    id: 'prevention',
    title: 'Prévention & Nettoyage',
    description: 'Programme de prévention personnalisé pour maintenir une santé bucco-dentaire optimale.',
    items: ['Détartrage professionnel', 'Bilans dentaires complets', 'Hygiène bucco-dentaire guidée', 'Prévention personnalisée'],
    Icon: Shield,
    color: '#0891B2',
    gradient: 'linear-gradient(135deg, rgba(8,145,178,0.12) 0%, rgba(8,145,178,0.04) 100%)',
    borderGlow: 'rgba(8,145,178,0.3)',
  },
  {
    id: 'blanchiment',
    title: 'Blanchiment Dentaire',
    description: 'Traitements esthétiques modernes pour un sourire lumineux et naturellement éclatant.',
    items: ['Sourire éclatant & naturel', 'Traitements certifiés modernes', 'Esthétique dentaire sur-mesure'],
    Icon: Sparkles,
    color: '#C9A84C',
    gradient: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)',
    borderGlow: 'rgba(201,168,76,0.3)',
  },
  {
    id: 'orthodontie',
    title: 'Orthodontie',
    description: 'Alignement précis et harmonieux pour un sourire équilibré et une occlusion parfaite.',
    items: ['Alignement dentaire précis', 'Appareils dentaires modernes', 'Correction complète du sourire'],
    Icon: AlignCenter,
    color: '#22D3EE',
    gradient: 'linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.04) 100%)',
    borderGlow: 'rgba(34,211,238,0.3)',
  },
  {
    id: 'protheses',
    title: 'Solutions Prothétiques',
    description: 'Prothèses sur-mesure pour restaurer votre sourire et votre qualité de vie au quotidien.',
    items: ['Prothèses fixes esthétiques', 'Prothèses amovibles confortables', 'Remplacement complet des dents'],
    Icon: Layers,
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.04) 100%)',
    borderGlow: 'rgba(6,182,212,0.3)',
  },
  {
    id: 'chirurgie',
    title: 'Chirurgie Dentaire',
    description: 'Interventions chirurgicales précises réalisées dans un cadre sécurisé et confortable.',
    items: ['Extractions simples & complexes', 'Interventions spécialisées', 'Sécurité et suivi optimal'],
    Icon: Scissors,
    color: '#0891B2',
    gradient: 'linear-gradient(135deg, rgba(8,145,178,0.12) 0%, rgba(8,145,178,0.04) 100%)',
    borderGlow: 'rgba(8,145,178,0.3)',
  },
  {
    id: 'urgences',
    title: 'Urgences Dentaires',
    description: 'Prise en charge immédiate et prioritaire de vos douleurs et situations d\'urgence.',
    items: ['Douleurs dentaires aiguës', 'Abcès et infections dentaires', 'Soins immédiats & soulagement'],
    Icon: Zap,
    color: '#C9A84C',
    gradient: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)',
    borderGlow: 'rgba(201,168,76,0.3)',
  },
];

function ServiceCard({
  service,
  index,
  onBookingOpen,
}: {
  service: (typeof services)[0];
  index: number;
  onBookingOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: easing }}
      whileHover={{ y: -8 }}
      className="group relative p-8 rounded-3xl bg-white border border-navy-100 cursor-pointer overflow-hidden transition-all duration-500"
      style={{ boxShadow: '0 4px 24px rgba(7,25,41,0.06), 0 1px 4px rgba(7,25,41,0.03)' }}
      onClick={onBookingOpen}
    >
      {/* Background gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: service.gradient }}
      />
      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${service.borderGlow}` }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500"
        style={{ background: service.color }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: `${service.color}15`,
            border: `1px solid ${service.color}25`,
          }}
        >
          <service.Icon className="w-6 h-6" style={{ color: service.color }} />
        </motion.div>

        {/* Title */}
        <h3
          className="font-display font-semibold text-navy-900 text-xl mb-3 leading-tight group-hover:transition-colors duration-300"
          style={{ letterSpacing: '-0.01em' }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-navy-500 text-sm leading-relaxed mb-5" style={{ lineHeight: '1.7' }}>
          {service.description}
        </p>

        {/* Items */}
        <ul className="space-y-2 mb-6">
          {service.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-navy-600 text-xs">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: service.color }}
              />
              {item}
            </li>
          ))}
        </ul>

        {/* CTA link */}
        <div
          className="flex items-center gap-2 text-xs font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          style={{ color: service.color }}
        >
          Prendre rendez-vous
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

interface ServicesProps {
  onBookingOpen: () => void;
}

export default function Services({ onBookingOpen }: ServicesProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="services"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8FBFD 0%, #EFF6FB 100%)' }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easing }}
          className="text-center mb-16"
        >
          <div className="section-tag mx-auto mb-4">
            <Sparkles className="w-3 h-3" />
            Nos Spécialités
          </div>
          <h2
            className="text-4xl lg:text-5xl font-display font-bold text-navy-900 mb-5 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Des soins complets,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)' }}
            >
              une expertise globale
            </span>
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Notre cabinet propose une gamme complète de soins dentaires, alliant expertise clinique et technologies de pointe pour prendre soin de votre santé bucco-dentaire à chaque étape de votre vie.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onBookingOpen={onBookingOpen}
            />
          ))}
          {/* Empty slot for visual balance with 7 items on 4-col grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.56, ease: easing }}
            className="hidden xl:flex flex-col items-center justify-center p-8 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(7,25,41,0.03) 0%, rgba(6,182,212,0.04) 100%)',
              border: '2px dashed rgba(6,182,212,0.2)',
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(6,182,212,0.1)' }}
            >
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="font-semibold text-navy-400 text-sm mb-2">Besoin d&apos;un soin spécifique ?</p>
            <p className="text-navy-400 text-xs leading-relaxed mb-4">Contactez-nous pour une consultation personnalisée</p>
            <button
              onClick={onBookingOpen}
              className="text-cyan-600 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
            >
              Prendre RDV <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
