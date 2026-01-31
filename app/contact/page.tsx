import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { generateMetadata as generateSEOMetadata, pageSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata(pageSEO.contact);

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-dark">
      <Navigation />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

