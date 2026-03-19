'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Globe, ChevronDown, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { YAPIO_PHONE_DISPLAY, YAPIO_PHONE_E164 } from '@/lib/contact';

type HomeSection = 'home' | 'services' | 'about' | 'testimonials' | 'contact';

type SectionTops = {
  services: number;
  about: number;
  testimonials: number;
  contact: number;
};

function getDocumentTop(el: HTMLElement | null): number {
  if (!el) return Infinity;
  return el.getBoundingClientRect().top + window.scrollY;
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [homeSection, setHomeSection] = useState<HomeSection>('home');
  const sectionTopsRef = useRef<SectionTops | null>(null);
  const { language, setLanguage, t, dir } = useLanguage();
  const isRtl = dir === 'rtl';
  const pathname = usePathname();

  // Déterminer si nous sommes sur la page d'accueil
  const isHomePage = pathname === '/';
  const isProjectsPage = pathname === '/projects' || pathname.startsWith('/projects/');
  const isBlogPage = pathname.startsWith('/blog');

  // Scroll : barre rétractée + section active sur la home (#services, #about, #contact)
  useEffect(() => {
    let raf = 0;

    const refreshSectionTops = () => {
      if (pathname !== '/') {
        sectionTopsRef.current = null;
        return;
      }
      sectionTopsRef.current = {
        services: getDocumentTop(document.getElementById('services')),
        about: getDocumentTop(document.getElementById('about')),
        testimonials: getDocumentTop(document.getElementById('testimonials')),
        contact: getDocumentTop(document.getElementById('contact')),
      };
    };

    const update = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setIsScrolled(window.scrollY > 20);

        if (pathname !== '/') {
          return;
        }

        const tops = sectionTopsRef.current;
        if (!tops) return;

        const headerOffset = 96;
        const activateAfter = 56;
        const y = window.scrollY + headerOffset;

        let next: HomeSection = 'home';
        if (y >= tops.contact - activateAfter) next = 'contact';
        else if (y >= tops.testimonials - activateAfter) next = 'testimonials';
        else if (y >= tops.about - activateAfter) next = 'about';
        else if (y >= tops.services - activateAfter) next = 'services';

        setHomeSection((prev) => (prev === next ? prev : next));
      });
    };

    refreshSectionTops();
    const t = window.setTimeout(() => {
      refreshSectionTops();
      update();
    }, 0);

    const onResizeOrHash = () => {
      refreshSectionTops();
      update();
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('hashchange', onResizeOrHash);
    window.addEventListener('resize', onResizeOrHash, { passive: true });

    return () => {
      window.clearTimeout(t);
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
      window.removeEventListener('hashchange', onResizeOrHash);
      window.removeEventListener('resize', onResizeOrHash);
    };
  }, [pathname]);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Verrouiller le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      // Sauvegarder la position du scroll
      const scrollY = window.scrollY;
      const body = document.body;
      const html = document.documentElement;
      
      // Appliquer les styles pour bloquer le scroll
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      body.classList.add('menu-open');
      
      // Pour iOS Safari
      html.style.overflow = 'hidden';
      html.style.position = 'fixed';
      html.style.width = '100%';
      html.style.height = '100%';
      
      return () => {
        // Restaurer le scroll
        const savedScrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.style.overflow = '';
        body.classList.remove('menu-open');
        
        html.style.overflow = '';
        html.style.position = '';
        html.style.width = '';
        html.style.height = '';
        
        if (savedScrollY) {
          window.scrollTo(0, parseInt(savedScrollY || '0') * -1);
        }
      };
    }
  }, [isOpen]);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
  ];

  // Navigation items — sur la home, l’actif suit la section visible (scroll + hash)
  const navItems = [
    {
      href: '/',
      label: t.nav.home,
      isActive: isHomePage && homeSection === 'home',
    },
    {
      href: isHomePage ? '#services' : '/#services',
      label: t.nav.services,
      isActive: isHomePage && homeSection === 'services',
    },
    {
      href: '/projects',
      label: t.nav.portfolio,
      isActive: isProjectsPage,
    },
    {
      href: '/blog/',
      label: t.nav.blog,
      isActive: isBlogPage,
    },
    {
      href: isHomePage ? '#about' : '/#about',
      label: t.nav.about,
      isActive: isHomePage && homeSection === 'about',
    },
    {
      href: isHomePage ? '#testimonials' : '/#testimonials',
      label: t.nav.testimonials,
      isActive: isHomePage && homeSection === 'testimonials',
    },
    {
      href: isHomePage ? '#contact' : '/#contact',
      label: t.nav.contact,
      isActive: isHomePage && homeSection === 'contact',
    },
  ];

  return (
    <header
      role="banner"
      className={`main-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled ? 'header-scrolled py-2' : 'py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        {/* Logo (design: .logo) — icononly_transparent_nobuffer.png */}
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Image
                src="/branding/icononly_transparent_nobuffer.png"
                alt="YAPIO"
                width={40}
                height={40}
                className="object-contain w-10 h-10"
                priority
              />
            </motion.div>
          </Link>
        </motion.div>

        {/* Desktop Navigation (design: nav) */}
        <nav className="hidden md:flex items-center" aria-label={t.nav.ariaMainNav}>
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
                  data-active={item.isActive ? 'true' : undefined}
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

            {/* Actions (design: nav-actions) */}
            <div className="nav-actions flex items-center ml-4 gap-2">
              {/* Call button */}
              <motion.a
                href={`tel:${YAPIO_PHONE_E164}`}
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Appeler ${YAPIO_PHONE_DISPLAY}`}
              >
                <Phone size={16} />
                <span className="text-sm font-medium" dir="ltr">{YAPIO_PHONE_DISPLAY}</span>
              </motion.a>

              {/* Language Selector */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300"
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
                      className="absolute top-full mt-2 end-0 backdrop-blur-xl bg-black/80 border border-white/10 rounded-xl shadow-2xl py-2 min-w-[140px] overflow-hidden"
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
                  className="cta-button relative overflow-hidden px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border"
                >
                  <span className="relative z-10">{t.nav.getQuote}</span>
                </Link>
              </motion.div>
            </div>
        </nav>

        {/* Mobile menu button - Hamburger moderne */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden relative w-12 h-12 flex items-center justify-center rounded-xl border backdrop-blur-sm transition-all duration-300 z-50 ${
            isOpen
              ? 'border-primary/40 bg-primary/10 text-white shadow-lg shadow-primary/20'
              : 'border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20'
          }`}
          whileTap={{ scale: 0.95 }}
          whileHover={!isOpen ? { scale: 1.05 } : {}}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <motion.span
              className="absolute top-0 left-0 w-full h-0.5 bg-current rounded-full origin-center"
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
              className="absolute top-1/2 left-0 w-full h-0.5 bg-current rounded-full origin-center -translate-y-1/2"
              animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-current rounded-full origin-center"
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
          {/* Effet de glow quand ouvert */}
          {isOpen && (
            <motion.div
              className="absolute inset-0 rounded-xl bg-primary/20 blur-xl -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.button>

        {/* Mobile Navigation - Side Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay sombre avec animation */}
              <motion.div
                className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />

              {/* Side Drawer */}
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={t.nav.ariaMobileMenu}
                className={`md:hidden fixed top-0 h-full w-[min(100vw-3rem,24rem)] max-w-sm bg-gradient-to-b from-black via-black to-gray-900 shadow-2xl z-50 overflow-y-auto border-white/10 ${
                  isRtl ? 'left-0 border-r' : 'right-0 border-l'
                }`}
                initial={{ x: isRtl ? '-100%' : '100%' }}
                animate={{ x: 0 }}
                exit={{ x: isRtl ? '-100%' : '100%' }}
                transition={{ 
                  type: 'spring', 
                  damping: 30, 
                  stiffness: 300,
                  duration: 0.4
                }}
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain'
                }}
              >
                {/* Header du drawer avec logo */}
                <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex items-center justify-between">
                  <Link 
                    href="/" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <Image
                      src="/branding/icononly_transparent_nobuffer.png"
                      alt="YAPIO"
                      width={32}
                      height={32}
                      className="object-contain"
                      priority
                    />
                    <span className="text-white font-semibold text-lg">YAPIO</span>
                  </Link>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                    whileTap={{ scale: 0.9 }}
                    aria-label="Fermer le menu"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                {/* Contenu du menu */}
                <div className="px-6 py-6 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 300,
                        damping: 25
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3.5 rounded-xl transition-all duration-300 text-base font-medium ${
                          item.isActive
                            ? 'bg-primary/20 text-white border border-primary/40 shadow-lg shadow-primary/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Séparateur */}
                  <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Language Selector Mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3"
                  >
                    <p className="text-xs uppercase tracking-wider text-gray-500 px-4 mb-2">
                      {t.nav.language}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {languages.map((lang) => (
                        <motion.button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                          }}
                          className={`flex flex-col items-center justify-center gap-1.5 px-3 py-3 rounded-xl transition-all text-sm font-medium ${
                            language === lang.code
                              ? 'bg-primary text-white shadow-lg shadow-primary/20 border border-primary/40'
                              : 'bg-white/5 text-gray-300 hover:bg-white/10 active:bg-white/15 border border-white/10'
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-2xl">{lang.flag}</span>
                          <span className="text-xs">{lang.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA Button Mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="pt-4"
                  >
                    <Link
                      href={isHomePage ? "#contact" : "/#contact"}
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center bg-primary hover:bg-primary-600 text-white px-6 py-4 rounded-xl font-semibold text-base shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all border border-primary/40 active:scale-[0.98]"
                    >
                      {t.nav.getQuote}
                    </Link>
                  </motion.div>

                  {/* Call Button Mobile */}
                  <motion.a
                    href={`tel:${YAPIO_PHONE_E164}`}
                    className="block w-full text-center bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-xl font-semibold text-base transition-all border border-white/10 active:scale-[0.98] mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    aria-label={`Appeler ${YAPIO_PHONE_DISPLAY}`}
                  >
                    <span className="inline-flex items-center justify-center gap-2" dir="ltr">
                      <Phone size={18} />
                      {YAPIO_PHONE_DISPLAY}
                    </span>
                  </motion.a>
                </div>

                {/* Footer du drawer */}
                <div className="sticky bottom-0 px-6 py-4 bg-black/40 backdrop-blur-xl border-t border-white/10 mt-auto">
                  <p className="text-xs text-center text-gray-500">
                    © {new Date().getFullYear()} YAPIO
                  </p>
                </div>
              </motion.div>
            </>
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
    </header>
  );
}
