'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-200">
      <Navigation />
      
      <main className="pt-20">
        <About />
      </main>

      <Footer />
    </div>
  );
}
