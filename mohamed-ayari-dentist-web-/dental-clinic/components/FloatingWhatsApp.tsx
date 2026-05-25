'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const phone = '21698302743';
  const message = encodeURIComponent(
    'Bonjour Dr Ayari, je souhaite prendre un rendez-vous pour une consultation. Merci.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #071929 0%, #0B2235 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 60px rgba(4,17,31,0.6), 0 8px 24px rgba(4,17,31,0.4)',
              width: '300px',
            }}
          >
            {/* Header */}
            <div className="p-5 flex items-center gap-4" style={{ background: '#25D366' }}>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white font-display font-bold text-lg">
                Dr
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Dr Ayari Mohamed</p>
                <p className="text-green-100 text-xs">Cabinet Dentaire · Hammam Lif</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-200 animate-pulse" />
                  <span className="text-green-100 text-xs">En ligne</span>
                </div>
              </div>
            </div>

            {/* Message bubble */}
            <div className="p-5">
              <div
                className="rounded-2xl rounded-tl-sm p-4 text-sm leading-relaxed"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.85)' }}
              >
                Bonjour ! 👋 Je suis le cabinet du Dr Ayari. Comment puis-je vous aider aujourd&apos;hui ?
              </div>
              <p className="text-white/30 text-xs mt-2 text-right">Réponse en quelques minutes</p>
            </div>

            {/* CTA */}
            <div className="px-5 pb-5">
              <a
                href={`https://wa.me/${phone}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl font-semibold text-white text-sm transition-all duration-200"
                style={{
                  background: '#25D366',
                  boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Démarrer la conversation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Bubble Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        aria-label="Contact WhatsApp"
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300"
        style={{
          background: open
            ? 'linear-gradient(135deg, #071929, #0B2235)'
            : '#25D366',
          boxShadow: open
            ? '0 8px 24px rgba(4,17,31,0.5)'
            : '0 8px 24px rgba(37,211,102,0.5)',
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
