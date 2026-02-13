'use client';

import React, { ReactNode, RefObject, useEffect, useLayoutEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBackgroundProps {
  targetRef: RefObject<HTMLElement | null>;
  className?: string;
  /**
   * Plage de translation verticale (CSS) en fonction du scroll.
   * Ex: ['0%', '15%']
   */
  yRange?: [string, string];
  children: ReactNode;
}

/**
 * Wrapper pour arrière-plan "parallax" basé sur le scroll.
 * Centralise la protection hydratation (ref pas encore attachée).
 */
export default function ParallaxBackground({
  targetRef,
  className = '',
  yRange = ['0%', '15%'],
  children,
}: ParallaxBackgroundProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollTargetReady, setScrollTargetReady] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // N'attacher la ref à useScroll qu'après hydratation (évite "Target ref is defined but not hydrated")
  useLayoutEffect(() => {
    if (!isMounted) return;
    const id = requestAnimationFrame(() => {
      setScrollTargetReady(!!targetRef.current);
    });
    return () => cancelAnimationFrame(id);
  }, [isMounted, targetRef]);

  const { scrollYProgress } = useScroll({
    target: scrollTargetReady ? targetRef : undefined,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

