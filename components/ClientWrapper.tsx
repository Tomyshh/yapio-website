'use client';

import { ReactNode } from 'react';

interface ClientWrapperProps {
  children: ReactNode;
}

/** Enveloppe client — scroll natif (sans Lenis) pour de meilleures perfs, notamment sous Windows. */
export default function ClientWrapper({ children }: ClientWrapperProps) {
  return <>{children}</>;
}
