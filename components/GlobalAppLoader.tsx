'use client';

import { useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type GlobalAppLoaderProps = {
  /** Tant que true, l’overlay bloque l’interaction ; à false, fondu de sortie puis démontage */
  visible: boolean;
};

export default function GlobalAppLoader({ visible }: GlobalAppLoaderProps) {
  useLayoutEffect(() => {
    if (visible) {
      document.documentElement.style.overflow = 'hidden';
    }
  }, [visible]);

  const handleExitComplete = () => {
    document.documentElement.style.overflow = '';
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="global-app-loader"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Chargement"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050508]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-primary/20" />
              <div className="absolute left-0 top-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary" />
            </div>
            <p className="animate-pulse text-lg text-gray-400">Chargement…</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
