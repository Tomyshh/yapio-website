'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';


export default function Home() {
  return (
    <main className="min-h-screen bg-dark">

      <Navigation />
      <Hero />
      <Services />
      <Features />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}