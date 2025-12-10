'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique du SmoothScroll uniquement
const SmoothScroll = dynamic(() => import('./SmoothScroll'), { ssr: false });

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <SmoothScroll>
      {children}
    </SmoothScroll>
  );
}
