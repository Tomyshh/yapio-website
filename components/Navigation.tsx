'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';
import { ResponsiveLogo } from './Logo';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LoadingWrapper } from './LoadingWrapper';
import ClientOnly from './ClientOnly';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  // Déterminer si nous sommes sur la page d'accueil
  const isHomePage = pathname === '/';

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

  // Définir navItems - maintenant sécurisé dans ClientOnly
  const navItems = [
    { 
      href: isHomePage ? '#home' : '/#home', 
      label: t.nav.home,
      isHome: true
    },
    { 
      href: isHomePage ? '#services' : '/#services', 
      label: t.nav.services,
      isHome: false
    },
    { 
      href: isHomePage ? '#portfolio' : '/#portfolio', 
      label: t.nav.portfolio,
      isHome: false
    },
    { 
      href: isHomePage ? '#about' : '/#about', 
      label: t.nav.about,
      isHome: false
    },
    { 
      href: isHomePage ? '#contact' : '/#contact', 
      label: t.nav.contact,
      isHome: false
    },
  ];

  return (
    <ClientOnly 
      fallback={
        <nav className="fixed top-0 w-full z-50 smooth-transition bg-transparent">
          <div className="max-w-7xl mx-auto section-padding">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center hover:opacity-80 smooth-transition">
                  <ResponsiveLogo />
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <div className="w-20 h-6 bg-gray-700 animate-pulse rounded"></div>
                <div className="w-20 h-6 bg-gray-700 animate-pulse rounded"></div>
                <div className="w-20 h-6 bg-gray-700 animate-pulse rounded"></div>
                <div className="w-20 h-6 bg-gray-700 animate-pulse rounded"></div>
                <div className="w-20 h-6 bg-gray-700 animate-pulse rounded"></div>
              </div>
              <div className="md:hidden">
                <Menu size={24} className="text-gray-300" />
              </div>
            </div>
          </div>
        </nav>
      }
    >
      <nav className={`fixed top-0 w-full z-50 smooth-transition ${
        isScrolled ? 'backdrop-blur-lg bg-black/30 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto section-padding">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href={isHomePage ? "#home" : "/"} className="flex items-center hover:opacity-80 smooth-transition">
                <ResponsiveLogo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <LoadingWrapper 
                  key={item.href}
                  delay={index * 50}
                  animationType="fade-blur"
                >
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-primary smooth-transition"
                  >
                    {item.label}
                  </Link>
                </LoadingWrapper>
              ))}
              
              {/* Language Selector */}
              <LoadingWrapper 
                delay={250}
                animationType="scale-blur"
              >
                <div className="relative">
                  <button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-primary smooth-transition"
                  >
                    <Globe size={20} />
                    <span>{languages.find(l => l.code === language)?.flag}</span>
                  </button>
                  
                  {showLangMenu && (
                    <div className="absolute top-full mt-2 right-0 backdrop-blur-lg bg-black/40 border border-white/5 rounded-lg shadow-xl py-2 min-w-[150px] animate-scale-in-blur">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setShowLangMenu(false);
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-dark-300 smooth-transition flex items-center space-x-2 ${
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
              </LoadingWrapper>

              <LoadingWrapper 
                delay={300}
                animationType="scale-blur"
                preserveSpace={true}
              >
                <Link
                  href={isHomePage ? "#contact" : "/#contact"}
                  className="gradient-primary text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-primary/25 smooth-transition"
                >
                  {t.nav.getQuote}
                </Link>
              </LoadingWrapper>
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
            <div className="md:hidden backdrop-blur-lg bg-black/30 border border-white/5 mt-2 rounded-lg animate-scale-in-blur">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) => (
                  <div key={item.href} className="animate-fade-in-blur" style={{ animationDelay: `${index * 80}ms` }}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-gray-300 hover:text-primary smooth-transition rounded-md hover:bg-white/5"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
                
                <div className="px-3 py-2 animate-fade-in-blur" style={{ animationDelay: '400ms' }}>
                  <div className="flex space-x-2">
                    {languages.map((lang, index) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsOpen(false);
                        }}
                        className={`px-3 py-1 rounded smooth-transition animate-scale-in-blur ${
                          language === lang.code
                            ? 'bg-primary text-white'
                            : 'bg-dark-300 text-gray-300 hover:bg-dark-200'
                        }`}
                        style={{ animationDelay: `${450 + index * 50}ms` }}
                      >
                        {lang.flag} {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="animate-scale-in-blur" style={{ animationDelay: '600ms' }}>
                  <Link
                    href={isHomePage ? "#contact" : "/#contact"}
                    onClick={() => setIsOpen(false)}
                    className="block mx-3 text-center gradient-primary text-white px-6 py-2 rounded-full smooth-transition hover:shadow-lg hover:shadow-primary/25"
                  >
                    {t.nav.getQuote}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </ClientOnly>
  );
}
