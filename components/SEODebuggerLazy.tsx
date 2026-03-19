'use client';

import dynamic from 'next/dynamic';

/**
 * En production, ce module ne charge pas le code du SEO debugger (chunk séparé, jamais demandé).
 * Zéro impact visuel / fonctionnel sur le site public.
 */
const SEODebuggerTrigger = dynamic(
  () =>
    import('@/components/SEODebugger').then((mod) => ({
      default: mod.SEODebuggerTrigger,
    })),
  { ssr: false }
);

export default function SEODebuggerLazy() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  return <SEODebuggerTrigger />;
}
