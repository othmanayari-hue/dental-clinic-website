'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Printer } from 'lucide-react';

const easing = [0.22, 1, 0.36, 1];

const contactCards = [
  {
    icon: Phone,
    title: 'Téléphone',
    lines: ['+216 98 302 743', '71 211 175', '71 291 097'],
    color: '#06B6D4',
    href: 'tel:+21698302743',
    cta: 'Appeler maintenant',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['dr_ayari_lakbar@yahoo.fr'],
    color: '#C9A84C',
    href: 'mailto:dr_ayari_lakbar@yahoo.fr',
    cta: 'Envoyer un email',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    lines: ['Avenue Taieb Mhiri', 'Hammam-Lif, Ben Arous', 'Tunisie'],
    color: '#22D3EE',
    href: 'https://maps.google.com/?q=Hammam-Lif,+Avenue+Taieb+Mhiri',
    cta: 'Voir sur la carte',
  },
  {
    icon: Printer,
    title: 'Fax',
    lines: ['71 211 175'],
    color: '#0891B2',
    href: undefined,
    cta: undefined,
  },
];

const hours = [
  { day: 'Lundi', time: '08:00 – 18:00', open: true },
  { day: 'Mardi', time: '08:00 – 18:00', open: true },
  { day: 'Mercredi', time: '08:00 – 18:00', open: true },
  { day: 'Jeudi', time: '08:00 – 18:00', open: true },
  { day: 'Vendredi', time: '08:00 – 18:00', open: true },
  { day: 'Samedi', time: '08:00 – 13:00', open: true },
  { day: 'Dimanche', time: 'Fermé', open: false },
];

const today = new Date().getDay(); // 0=Sunday, 1=Monday...
const dayMap: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section
      id="contact"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #04111F 0%, #071929 50%, #0B2235 100%)' }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
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
            <MapPin className="w-3 h-3" />
            Nous Contacter
          </div>
          <h2
            className="text-4xl lg:text-5xl font-display font-bold text-white mb-5"
            style={{ letterSpacing: '-0.02em' }}
          >
            Venez nous rendre
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #67E8F9 0%, #06B6D4 100%)' }}
            >
              visite à Hammam Lif
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions et vous accueillir dans notre cabinet moderne.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: easing }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                boxShadow: '0 24px 60px rgba(4,17,31,0.5)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Map embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.8!2d10.3239!3d36.7233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd5a0b0b0b0b0b%3A0x0!2sHammam-Lif!5e0!3m2!1sfr!2stn!4v1"
                width="100%"
                height="360"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cabinet Dentaire Dr Ayari — Hammam Lif"
              />
              {/* Map footer */}
              <div
                className="p-5 flex items-center justify-between gap-4"
                style={{ background: 'rgba(4,17,31,0.8)', backdropFilter: 'blur(8px)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(6,182,212,0.15)' }}
                  >
                    <MapPin className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Avenue Taieb Mhiri</p>
                    <p className="text-white/50 text-xs">Hammam-Lif, Ben Arous, Tunisie</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Hammam-Lif,+Avenue+Taieb+Mhiri,+Tunisia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-4 py-2 rounded-xl text-white text-xs font-semibold transition-all duration-200"
                  style={{ background: 'rgba(6,182,212,0.2)', border: '1px solid rgba(6,182,212,0.3)' }}
                >
                  Itinéraire
                </a>
              </div>
            </div>

            {/* Contact cards grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {contactCards.map(({ icon: Icon, title, lines, color, href, cta }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3, ease: easing }}
                  className="p-5 rounded-2xl group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${color}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{title}</p>
                  {lines.map((line) => (
                    <p key={line} className="text-white/50 text-xs leading-relaxed">{line}</p>
                  ))}
                  {href && cta && (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="mt-3 inline-flex items-center text-xs font-semibold transition-all duration-200"
                      style={{ color }}
                    >
                      {cta} →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right sidebar — hours + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: easing }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Working hours */}
            <div
              className="rounded-3xl p-7"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(201,168,76,0.15)' }}
                >
                  <Clock className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-white font-display font-semibold">Horaires d&apos;ouverture</p>
                  <p className="text-white/40 text-xs">Cabinet Dentaire Dr Ayari</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {hours.map(({ day, time, open }, i) => {
                  const isToday = dayMap[today] === i;
                  return (
                    <div
                      key={day}
                      className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-all duration-200 ${
                        isToday
                          ? 'bg-cyan-400/10 border border-cyan-400/20'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isToday && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            isToday ? 'text-cyan-300' : 'text-white/70'
                          }`}
                        >
                          {day}
                          {isToday && <span className="text-cyan-400/60 text-xs ml-1">(aujourd&apos;hui)</span>}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-mono font-medium ${
                          !open
                            ? 'text-red-400'
                            : isToday
                            ? 'text-cyan-400'
                            : 'text-white/60'
                        }`}
                      >
                        {time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/21698302743?text=Bonjour%20Dr%20Ayari%2C%20je%20souhaite%20prendre%20un%20rendez-vous."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-6 rounded-3xl transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #128C7E 0%, #075E54 100%)',
                boxShadow: '0 12px 32px rgba(18,140,126,0.4)',
              }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold">Chattez sur WhatsApp</p>
                <p className="text-white/70 text-sm">Réponse rapide garantie</p>
              </div>
            </motion.a>

            {/* Emergency CTA */}
            <div
              className="p-6 rounded-3xl text-center"
              style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.15)',
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center mx-auto mb-3">
                <Phone className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-white font-semibold text-sm mb-1">Urgence Dentaire ?</p>
              <p className="text-white/50 text-xs mb-4 leading-relaxed">
                En cas de douleur aiguë ou d&apos;abcès, contactez-nous immédiatement.
              </p>
              <a
                href="tel:+21698302743"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
                style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)' }}
              >
                <Phone className="w-4 h-4 text-red-400" />
                Appel d&apos;urgence
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
