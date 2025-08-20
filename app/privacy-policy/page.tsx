import React from 'react';
import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { generateMetadata as generateSEOMetadata, pageSEO } from '@/lib/seo';
import PrivacyPolicyContent from './PrivacyPolicyContent';

export const metadata: Metadata = generateSEOMetadata(pageSEO.privacy);

export default function PrivacyPolicyPage() {

  return (
    <div className="min-h-screen bg-dark-200">
      <Navigation />
      <PrivacyPolicyContent />
      <Footer />
    </div>
  );
}
