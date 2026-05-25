'use client';

import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustIndicators from '@/components/TrustIndicators';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import BackToTop from '@/components/BackToTop';

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />

      <Navbar onBookingOpen={() => setBookingOpen(true)} />

      <main>
        <Hero onBookingOpen={() => setBookingOpen(true)} />
        <TrustIndicators />
        <About />
        <Services onBookingOpen={() => setBookingOpen(true)} />
        <WhyChooseUs />
        <Testimonials />
        <Gallery />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
