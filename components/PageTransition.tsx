'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {/* Overlay de transition */}
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.65, 0, 0.35, 1],
          }}
          style={{
            originY: 'top',
            background: 'linear-gradient(135deg, #7737E9 0%, #5E1FD4 100%)',
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Effet de révélation au scroll
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  width?: 'fit' | 'full';
}

export function ScrollReveal({ 
  children, 
  className = '',
  width = 'full' 
}: ScrollRevealProps) {
  return (
    <div className={`relative overflow-hidden ${width === 'full' ? 'w-full' : 'w-fit'} ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
