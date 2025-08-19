'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-100 border-t border-dark-300 py-8">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo and copyright */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <span className="text-2xl font-bold gradient-text">YAPIO</span>
            <span className="text-gray-400 text-sm">
              © {currentYear} YAPIO. {t.footer.rights}
            </span>
          </div>
          
          {/* Links */}
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors text-sm">
              {t.footer.privacy}
            </a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-primary transition-colors text-sm">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
