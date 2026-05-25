'use client';

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Heart } from 'lucide-react';

const quickLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Services', href: '#services' },
  { label: 'Témoignages', href: '#temoignages' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const servicesLinks = [
  'Dentisterie Restauratrice',
  'Prévention & Nettoyage',
  'Blanchiment Dentaire',
  'Orthodontie',
  'Solutions Prothétiques',
  'Chirurgie Dentaire',
  'Urgences Dentaires',
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #04111F 0%, #020C17 100%)' }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(201,168,76,0.2), transparent)' }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)' }}
              >
                <svg width="22" height="22" viewBox="0 0 44 44" fill="none">
                  <path d="M22 4C17.5 4 14 7 12 10C10 13 9 17 9 20C9 24 10 28 11 31C12 34 13.5 40 16 40C18.5 40 19 37 20 34C20.5 32.5 21 31 22 31C23 31 23.5 32.5 24 34C25 37 25.5 40 28 40C30.5 40 32 34 33 31C34 28 35 24 35 20C35 17 34 13 32 10C30 7 26.5 4 22 4Z" fill="url(#footerToothGrad)" />
                  <defs>
                    <linearGradient id="footerToothGrad" x1="9" y1="4" x2="35" y2="40" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#22D3EE" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="text-white font-display font-semibold leading-tight">Dr Ayari Mohamed</p>
                <p className="text-cyan-400/60 text-[10px] tracking-widest uppercase">Médecin Dentiste</p>
              </div>
            </div>

            <p className="text-white/40 text-sm leading-relaxed mb-6" style={{ lineHeight: '1.75' }}>
              Cabinet dentaire d&apos;excellence à Hammam Lif. Expertise, bienveillance et technologies modernes au service de votre sourire.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/80 font-semibold text-sm mb-5 tracking-wide">Navigation</p>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className="text-white/40 hover:text-cyan-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-cyan-400 transition-all duration-300 overflow-hidden" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-white/80 font-semibold text-sm mb-5 tracking-wide">Nos Services</p>
            <ul className="space-y-3">
              {servicesLinks.map((service) => (
                <li key={service}>
                  <span className="text-white/40 text-sm leading-tight block hover:text-white/60 transition-colors duration-200 cursor-default">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-white/80 font-semibold text-sm mb-5 tracking-wide">Coordonnées</p>
            <div className="space-y-4">
              <a href="tel:+21698302743" className="flex items-start gap-3 group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(6,182,212,0.12)' }}>
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Téléphone</p>
                  <p className="text-white/70 text-sm group-hover:text-cyan-400 transition-colors">+216 98 302 743</p>
                  <p className="text-white/50 text-xs">71 211 175 · 71 291 097</p>
                </div>
              </a>

              <a href="mailto:dr_ayari_lakbar@yahoo.fr" className="flex items-start gap-3 group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(201,168,76,0.12)' }}>
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Email</p>
                  <p className="text-white/70 text-sm group-hover:text-gold-400 transition-colors break-all">dr_ayari_lakbar@yahoo.fr</p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(34,211,238,0.12)' }}>
                  <MapPin className="w-3.5 h-3.5 text-cyan-300" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Adresse</p>
                  <p className="text-white/70 text-sm">Avenue Taieb Mhiri</p>
                  <p className="text-white/50 text-xs">Hammam-Lif, Ben Arous, Tunisie</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(6,182,212,0.12)' }}>
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Horaires</p>
                  <p className="text-white/70 text-sm">Lun–Ven: 08:00–18:00</p>
                  <p className="text-white/50 text-xs">Sam: 08:00–13:00 · Dim: Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Cabinet Dentaire Dr Ayari Mohamed. Tous droits réservés.
          </p>
          <div className="flex items-center gap-1 text-white/25 text-xs">
            <span>Fait avec</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            <span>à Hammam Lif, Tunisie</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
