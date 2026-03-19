'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';

/* Sections sous la ligne de flottaison : chunks JS séparés — HTML SSG inchangé, LCP sur Hero + nav */
const Services = dynamic(() => import('@/components/Services'));
const Portfolio = dynamic(() => import('@/components/Portfolio'));
const About = dynamic(() => import('@/components/About'));
const Expertise = dynamic(() => import('@/components/Expertise'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));

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
