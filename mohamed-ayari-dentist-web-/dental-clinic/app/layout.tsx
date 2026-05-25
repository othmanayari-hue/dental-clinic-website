import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cabinet-ayari.tn'),
  title: {
    default: 'Cabinet Dentaire Dr Ayari Mohamed | Orthodontie — Hammam Lif',
    template: '%s | Cabinet Dentaire Dr Ayari',
  },
  description:
    'Cabinet dentaire d\'excellence à Hammam Lif, Ben Arous. Dr Ayari Mohamed — spécialiste en orthodontie, dentisterie esthétique, prothèses et soins conservateurs. Prenez rendez-vous dès aujourd\'hui.',
  keywords: [
    'dentiste Hammam Lif',
    'cabinet dentaire Ben Arous',
    'orthodontie Tunisie',
    'Dr Ayari Mohamed dentiste',
    'blanchiment dentaire Hammam Lif',
    'prothèse dentaire Tunisie',
    'urgence dentaire Hammam Lif',
    'soins dentaires Ben Arous',
  ],
  authors: [{ name: 'Dr Ayari Mohamed' }],
  creator: 'Cabinet Dentaire Dr Ayari',
  publisher: 'Cabinet Dentaire Dr Ayari',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_TN',
    url: 'https://cabinet-ayari.tn',
    siteName: 'Cabinet Dentaire Dr Ayari Mohamed',
    title: 'Cabinet Dentaire Dr Ayari Mohamed | Orthodontie — Hammam Lif',
    description:
      'Cabinet dentaire d\'excellence à Hammam Lif, Ben Arous. Expertise reconnue en orthodontie, esthétique et soins complets.',
    images: [
      {
        url: '/ayari-dentist.png',
        alt: 'Cabinet Dentaire Dr Ayari Mohamed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cabinet Dentaire Dr Ayari Mohamed | Orthodontie Hammam Lif',
    description:
      'Soins dentaires d\'excellence à Hammam Lif, Tunisie. Orthodontie, blanchiment, prothèses et urgences.',
    images: ['/ayari-dentist.png'],
  },
  alternates: {
    canonical: 'https://cabinet-ayari.tn',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#04111F' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${playfair.variable} ${jakarta.variable} ${dmMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" />
        <meta name="theme-color" content="#06B6D4" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
