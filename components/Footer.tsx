'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from './Logo';
import Link from 'next/link';
import Image from 'next/image';
import ModernBackground from './ModernBackground';
import { motion } from 'framer-motion';
import {
  YAPIO_PHONE_ISRAEL_DISPLAY,
  YAPIO_PHONE_ISRAEL_E164,
  YAPIO_WHATSAPP_PHONE,
  YAPIO_LINKEDIN_URL,
} from '@/lib/contact';

export default function Footer() {
  const { t, isLoading } = useLanguage();
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const waHref = `https://wa.me/${YAPIO_WHATSAPP_PHONE}`;

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
    <footer className="relative py-14 overflow-hidden">
      <ModernBackground />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto section-padding relative z-10">
        <motion.div
          className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
            <Logo variant="full" size="sm" theme="white" />
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              © {currentYear || new Date().getFullYear()} YAPIO. {t.footer.rights}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 lg:items-end">
            <ul className="flex flex-wrap items-center justify-center gap-y-3 gap-x-2 sm:gap-x-0 lg:justify-end list-none m-0 p-0">
              <li className="flex items-center">
                <motion.a
                  href={`tel:${YAPIO_PHONE_ISRAEL_E164}`}
                  className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={t.footer.callIsraelAria}
                >
                  <span className="text-[11px] uppercase tracking-wider text-gray-500 group-hover:text-gray-400">
                    {t.footer.phoneIsrael}
                  </span>
                  <span className="font-medium tabular-nums">{YAPIO_PHONE_ISRAEL_DISPLAY}</span>
                </motion.a>
              </li>
              <li className="hidden sm:flex text-white/15 select-none" aria-hidden>
                |
              </li>
              <li className="flex items-center">
                <motion.a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-3 sm:px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={t.footer.whatsappAria}
                >
                  <Image
                    src="/logo/social/whatsapp.png"
                    alt=""
                    width={22}
                    height={22}
                    className="opacity-90 group-hover:opacity-100 transition-opacity shrink-0"
                  />
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-[11px] uppercase tracking-wider text-gray-500 group-hover:text-gray-400">
                      {t.footer.whatsapp}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-300">
                      {t.footer.phoneFrance}
                    </span>
                  </span>
                </motion.a>
              </li>
              <li className="hidden sm:flex text-white/15 select-none" aria-hidden>
                |
              </li>
              <li className="flex items-center">
                <motion.a
                  href={YAPIO_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3 sm:px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={t.footer.linkedinAria}
                >
                  <Image
                    src="/logo/social/linkedin.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="opacity-95 hover:opacity-100 transition-opacity shrink-0 rounded-[3px]"
                  />
                  <span className="text-[11px] uppercase tracking-wider text-gray-500 hover:text-gray-400">
                    {t.footer.linkedin}
                  </span>
                </motion.a>
              </li>
            </ul>

            <nav
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm"
              aria-label={t.footer.legalNav}
            >
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-primary transition-colors relative group"
              >
                {t.footer.privacy}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-400 hover:text-primary transition-colors relative group"
              >
                {t.footer.terms}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </nav>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 h-px rounded-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        />
      </div>
    </footer>
  );
}
