'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
  ];

  const navItems = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#portfolio', label: t.nav.portfolio },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="text-2xl font-bold gradient-text">
              YAPIO
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
              >
                <Globe size={20} />
                <span>{languages.find(l => l.code === language)?.flag}</span>
              </button>
              
              {showLangMenu && (
                <div className="absolute top-full mt-2 right-0 bg-dark-200 rounded-lg shadow-xl py-2 min-w-[150px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-dark-300 transition-colors flex items-center space-x-2 ${
                        language === lang.code ? 'text-primary' : 'text-gray-300'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#contact"
              className="gradient-primary text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              {t.nav.getQuote}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass mt-2 rounded-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-gray-300 hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              
              <div className="px-3 py-2">
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsOpen(false);
                      }}
                      className={`px-3 py-1 rounded ${
                        language === lang.code
                          ? 'bg-primary text-white'
                          : 'bg-dark-300 text-gray-300'
                      }`}
                    >
                      {lang.flag} {lang.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block mx-3 text-center gradient-primary text-white px-6 py-2 rounded-full"
              >
                {t.nav.getQuote}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
