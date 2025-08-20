import React from 'react';
import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { generateMetadata as generateSEOMetadata, pageSEO } from '@/lib/seo';
import TermsOfServiceContent from './TermsOfServiceContent';

export const metadata: Metadata = generateSEOMetadata(pageSEO.terms);

export default function TermsOfServicePage() {

  return (
    <div className="min-h-screen bg-dark-200">
      <Navigation />
      <TermsOfServiceContent />
      <Footer />
    </div>
  );
}
