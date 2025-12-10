'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from './Logo';
import Link from 'next/link';
import ModernBackground from './ModernBackground';
import { motion } from 'framer-motion';

export default function Footer() {
  const { t, isLoading } = useLanguage();
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Protection contre les erreurs d'hydratation
  if (isLoading || !t?.footer) {
    return (
      <footer className="relative py-8 overflow-hidden">
        <ModernBackground />
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <Logo variant="full" size="sm" theme="white" />
              <span className="text-gray-400 text-sm">
                © {currentYear || new Date().getFullYear()} YAPIO. Tous droits réservés
              </span>
            </div>
            <div className="flex space-x-6">
              <div className="w-32 h-4 bg-gray-700 animate-pulse rounded"></div>
              <div className="w-28 h-4 bg-gray-700 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Arrière-plan moderne unifié */}
      <ModernBackground />

      {/* Gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto section-padding relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo and copyright */}
          <motion.div 
            className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <Logo variant="full" size="sm" theme="white" />
            <span className="text-gray-400 text-sm">
              © {currentYear || new Date().getFullYear()} YAPIO. {t.footer.rights}
            </span>
          </motion.div>
          
          {/* Links */}
          <div className="flex items-center space-x-6">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                href="/privacy-policy" 
                className="text-gray-400 hover:text-primary transition-colors text-sm relative group"
              >
                {t.footer.privacy}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                href="/terms-of-service" 
                className="text-gray-400 hover:text-primary transition-colors text-sm relative group"
              >
                {t.footer.terms}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative bottom gradient */}
        <motion.div 
          className="mt-8 h-1 rounded-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
    </footer>
  );
}
