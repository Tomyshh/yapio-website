'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ContinuousPageBackdrop from '@/components/ContinuousPageBackdrop';

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
    <main className="relative min-h-screen bg-[#050508] text-foreground">
      <ContinuousPageBackdrop />
      <div className="relative z-[1]">
        <Navigation />
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Expertise />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
