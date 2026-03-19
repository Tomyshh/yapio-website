'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';


export default function Home() {
  return (
    <main className="min-h-screen bg-dark">

      <Navigation />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Expertise />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}