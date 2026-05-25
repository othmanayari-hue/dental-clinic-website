'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const easing = [0.22, 1, 0.36, 1];

const faqs = [
  {
    id: '1',
    question: 'À quelle fréquence dois-je consulter un dentiste ?',
    answer:
      'Il est recommandé de consulter votre dentiste au moins deux fois par an pour un bilan et un nettoyage de prévention. Cela permet de détecter précocement les caries, les maladies parodontales ou tout autre problème bucco-dentaire avant qu\'il ne s\'aggrave.',
  },
  {
    id: '2',
    question: 'Les soins dentaires sont-ils douloureux ?',
    answer:
      'Grâce aux anesthésies locales modernes et à notre approche bienveillante, la grande majorité des soins se déroulent sans douleur. Le Dr Ayari prend le temps d\'adapter chaque consultation à votre sensibilité et vous accompagne tout au long du traitement pour garantir votre confort.',
  },
  {
    id: '3',
    question: 'Comment puis-je prendre rendez-vous ?',
    answer:
      'Vous pouvez prendre rendez-vous directement via le formulaire en ligne sur notre site, par téléphone au +216 98 302 743 / 71 211 175, ou encore par WhatsApp. Nous vous répondrons dans les plus brefs délais pour confirmer votre créneau.',
  },
  {
    id: '4',
    question: 'Combien de temps dure un traitement orthodontique ?',
    answer:
      'La durée d\'un traitement orthodontique varie selon la complexité du cas, généralement entre 12 et 36 mois. Après une évaluation complète, le Dr Ayari établira un plan de traitement personnalisé avec une estimation précise de la durée et des étapes à suivre.',
  },
  {
    id: '5',
    question: 'À quel âge commencer l\'orthodontie pour mon enfant ?',
    answer:
      'Un premier bilan orthodontique est recommandé dès 7-8 ans, lorsque les premières dents définitives font leur apparition. Cela permet de détecter d\'éventuels problèmes de croissance et d\'intervenir de manière préventive si nécessaire, réduisant ainsi la durée et la complexité du traitement futur.',
  },
  {
    id: '6',
    question: 'Que faire en cas d\'urgence dentaire ?',
    answer:
      'En cas de douleur aiguë, d\'abcès ou de traumatisme dentaire, contactez le cabinet immédiatement au +216 98 302 743. Nous faisons de notre mieux pour vous recevoir en urgence le jour même. En dehors des heures d\'ouverture, laissez un message et nous vous rappellerons dès que possible.',
  },
  {
    id: '7',
    question: 'Le blanchiment dentaire est-il sans risque ?',
    answer:
      'Les traitements de blanchiment réalisés au cabinet dentaire sont parfaitement sûrs lorsqu\'ils sont effectués par un professionnel. Le Dr Ayari utilise des produits certifiés et adapte la concentration aux besoins de chaque patient. Un examen préalable est toujours réalisé pour s\'assurer de la compatibilité du traitement.',
  },
  {
    id: '8',
    question: 'Comment entretenir mon appareil dentaire ?',
    answer:
      'L\'entretien de votre appareil dentaire est essentiel. Nous vous fournirons des instructions complètes et personnalisées : brossage après chaque repas, nettoyage spécifique de l\'appareil, aliments à éviter, et conduite à tenir en cas de casse ou de douleur. Notre équipe est toujours disponible pour répondre à vos questions.',
  },
];

function FAQItem({ item, isOpen, onToggle }: {
  item: typeof faqs[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: easing }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-cyan-300 shadow-cyan'
          : 'border-navy-100 hover:border-cyan-200'
      }`}
      style={{
        background: isOpen
          ? 'linear-gradient(135deg, rgba(6,182,212,0.04) 0%, rgba(6,182,212,0.01) 100%)'
          : 'white',
        boxShadow: isOpen ? '0 8px 32px rgba(6,182,212,0.08)' : '0 2px 8px rgba(7,25,41,0.04)',
      }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className={`font-semibold text-base transition-colors duration-200 ${
            isOpen ? 'text-cyan-700' : 'text-navy-900'
          }`}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: easing }}
          className="flex-shrink-0"
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? 'bg-cyan-100 text-cyan-600'
                : 'bg-navy-50 text-navy-400'
            }`}
          >
            {isOpen ? (
              <Minus className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </div>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easing }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="h-px bg-gradient-to-r from-cyan-200 via-cyan-300 to-transparent mb-4" />
              <p className="text-navy-600 text-sm leading-relaxed" style={{ lineHeight: '1.8' }}>
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });
  const [openId, setOpenId] = useState<string | null>('1');

  return (
    <section
      id="faq"
      className="py-28 relative overflow-hidden bg-white"
    >
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easing }}
          className="text-center mb-14"
        >
          <div className="section-tag mx-auto mb-4">
            <HelpCircle className="w-3 h-3" />
            Questions Fréquentes
          </div>
          <h2
            className="text-4xl lg:text-5xl font-display font-bold text-navy-900 mb-5"
            style={{ letterSpacing: '-0.02em' }}
          >
            Vos questions,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)' }}
            >
              nos réponses
            </span>
          </h2>
          <p className="text-navy-500 text-lg">
            Tout ce que vous devez savoir avant votre première visite.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easing }}
          className="mt-12 p-8 rounded-3xl text-center"
          style={{
            background: 'linear-gradient(135deg, #071929 0%, #0B2235 100%)',
            border: '1px solid rgba(6,182,212,0.2)',
          }}
        >
          <p className="text-white font-display font-semibold text-xl mb-2">
            Vous avez d&apos;autres questions ?
          </p>
          <p className="text-white/60 text-sm mb-6">
            Notre équipe est disponible pour vous répondre par téléphone, email ou WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+21698302743"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
              style={{ background: 'rgba(6,182,212,0.2)', border: '1px solid rgba(6,182,212,0.3)' }}
            >
              Nous appeler
            </a>
            <a
              href="mailto:dr_ayari_lakbar@yahoo.fr"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
              style={{ background: 'linear-gradient(135deg, #06B6D4, #0891B2)' }}
            >
              Envoyer un email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
