'use client';

import { useLayoutEffect, useEffect, useRef, useState, useCallback } from 'react';

type GlobalAppLoaderProps = {
  /** Tant que true, l’overlay bloque l’interaction ; à false, fondu CSS puis démontage */
  visible: boolean;
};

export default function GlobalAppLoader({ visible }: GlobalAppLoaderProps) {
  const [rendered, setRendered] = useState(visible);
  const [exiting, setExiting] = useState(false);
  const exitDoneRef = useRef(false);

  useLayoutEffect(() => {
    if (visible) {
      exitDoneRef.current = false;
      setRendered(true);
      setExiting(false);
      document.documentElement.style.overflow = 'hidden';
      return;
    }
    if (rendered && !exiting && !exitDoneRef.current) {
      setExiting(true);
    }
  }, [visible, rendered, exiting]);

  useEffect(() => {
    if (!exiting) return;

    const tearDown = () => {
      if (exitDoneRef.current) return;
      exitDoneRef.current = true;
      setRendered(false);
      setExiting(false);
      document.documentElement.style.overflow = '';
    };

    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        tearDown();
        return;
      }
    }

    const id = window.setTimeout(tearDown, 800);
    return () => clearTimeout(id);
  }, [exiting]);

  const onOverlayTransitionEnd = useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'opacity') return;
    if (!exiting) return;
    exitDoneRef.current = true;
    setRendered(false);
    setExiting(false);
    document.documentElement.style.overflow = '';
  }, [exiting]);

  if (!rendered) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
      aria-label="Chargement"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050508] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        exiting ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      onTransitionEnd={onOverlayTransitionEnd}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-primary/20" />
          <div className="absolute left-0 top-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary" />
        </div>
        <p className="animate-pulse text-lg text-gray-400">Chargement…</p>
      </div>
    </div>
  );
}
