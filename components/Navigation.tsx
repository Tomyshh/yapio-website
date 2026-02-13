'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';
import { ResponsiveLogo } from './Logo';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { YAPIO_PHONE_DISPLAY, YAPIO_PHONE_E164 } from '@/lib/contact';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  // Déterminer si nous sommes sur la page d'accueil
  const isHomePage = pathname === '/';
  const isProjectsPage = pathname === '/projects' || pathname.startsWith('/projects/');

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setIsScrolled(window.scrollY > 20);
      });
    };

    onScroll(); // état initial
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
  ];

  // Navigation items - maintenant avec des pages dédiées
  const navItems = [
    { 
      href: '/', 
      label: t.nav.home,
      isActive: isHomePage
    },
    { 
      href: isHomePage ? '#services' : '/#services', 
      label: t.nav.services,
      isActive: false
    },
    { 
      href: '/projects', 
      label: t.nav.portfolio,
      isActive: isProjectsPage
    },
    { 
      href: isHomePage ? '#about' : '/#about', 
      label: t.nav.about,
      isActive: false
    },
    { 
      href: isHomePage ? '#contact' : '/#contact', 
      label: t.nav.contact,
      isActive: false
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-3'
      } glass-strong bg-black/65`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ResponsiveLogo />
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      item.isActive
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {item.isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center ml-4 gap-2">
              {/* Call button */}
              <motion.a
                href={`tel:${YAPIO_PHONE_E164}`}
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Appeler ${YAPIO_PHONE_DISPLAY}`}
              >
                <Phone size={16} />
                <span className="text-sm font-medium">{YAPIO_PHONE_DISPLAY}</span>
              </motion.a>

              {/* Language Selector */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Globe size={16} />
                  <span className="text-lg">{languages.find(l => l.code === language)?.flag}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${showLangMenu ? 'rotate-180' : ''}`} />
                </motion.button>
                
                <AnimatePresence>
                  {showLangMenu && (
                    <motion.div 
                      className="absolute top-full mt-2 right-0 backdrop-blur-xl bg-black/80 border border-white/10 rounded-xl shadow-2xl py-2 min-w-[140px] overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {languages.map((lang, index) => (
                        <motion.button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setShowLangMenu(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left hover:bg-white/10 transition-all flex items-center gap-3 ${
                            language === lang.code ? 'text-primary bg-primary/10' : 'text-gray-300'
                          }`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="text-sm font-medium">{lang.name}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href={isHomePage ? "#contact" : "/#contact"}
                  className="relative overflow-hidden px-5 py-2.5 rounded-full bg-primary hover:bg-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 border border-primary/30"
                >
                  <span className="relative z-10">{t.nav.getQuote}</span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-4 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="backdrop-blur-xl bg-black/70 border border-white/10 rounded-2xl p-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                        item.isActive
                          ? 'bg-white/5 text-white border border-primary/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Language Selector */}
                <motion.div 
                  className="pt-2 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="flex gap-2 px-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl transition-all ${
                          language === lang.code
                            ? 'bg-primary text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href={isHomePage ? "#contact" : "/#contact"}
                    onClick={() => setIsOpen(false)}
                    className="block text-center bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all border border-primary/30"
                  >
                    {t.nav.getQuote}
                  </Link>
                </motion.div>

                {/* Mobile Call */}
                <motion.a
                  href={`tel:${YAPIO_PHONE_E164}`}
                  className="block text-center bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  aria-label={`Appeler ${YAPIO_PHONE_DISPLAY}`}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <Phone size={18} />
                    {YAPIO_PHONE_DISPLAY}
                  </span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay for closing dropdowns */}
      {showLangMenu && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setShowLangMenu(false)}
        />
      )}
    </nav>
  );
}
