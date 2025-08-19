'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from './Logo';
import Link from 'next/link';

export default function Footer() {
  const { t } = useLanguage();
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-dark-100 border-t border-dark-300 py-8">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo and copyright */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <Logo variant="full" size="sm" theme="white" />
            <span className="text-gray-400 text-sm">
              © {currentYear || new Date().getFullYear()} YAPIO. {t.footer.rights}
            </span>
          </div>
          
          {/* Links */}
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors text-sm">
              {t.footer.privacy}
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-primary transition-colors text-sm">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
