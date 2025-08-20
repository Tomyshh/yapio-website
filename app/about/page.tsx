import React from 'react';
import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { generateMetadata as generateSEOMetadata, pageSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata(pageSEO.about);

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
