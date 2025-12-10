import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Suspense } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOOptimizer from "@/components/SEOOptimizer";
import { SEODebuggerTrigger } from "@/components/SEODebugger";
import { generateMetadata as generateSEOMetadata, pageSEO, generateStructuredData } from "@/lib/seo";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata: Metadata = generateSEOMetadata(pageSEO.home);

// Composant de chargement fluide
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
        <div className="text-gray-400 animate-pulse text-lg">Chargement...</div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        {/* Google Fonts - Orbitron et Exo 2 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        
        {/* Métadonnées SEO avancées */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* Icônes optimisées */}
        <link rel="icon" type="image/png" sizes="16x16" href="/branding/icononly_transparent_nobuffer.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/branding/icononly_transparent_nobuffer.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/branding/icononly_transparent_nobuffer.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/branding/icononly_transparent_nobuffer.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/branding/icononly_transparent_nobuffer.png" />
        <link rel="shortcut icon" href="/branding/icononly_transparent_nobuffer.png" />
        
        {/* Préchargement des ressources critiques */}
        <link
          rel="preload"
          href="/branding/icononly_transparent_nobuffer.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/branding/fulllogo_transparent_nobuffer.png"
          as="image"
          type="image/png"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData('Organization', {})),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData('WebSite', {})),
          }}
        />
        
        {/* Configuration simplifiée pour le chargement */}
        <style>{`
          html { 
            font-display: swap;
          }
          .text-skeleton {
            background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
        
        {/* Google tag (gtag.js) pour Google Ads */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17494474378"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17494474378');
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="transition-all duration-300 antialiased">
        <SEOOptimizer>
          <Suspense fallback={<LoadingFallback />}>
            <LanguageProvider>
              <ClientWrapper>
                {children}
              </ClientWrapper>
            </LanguageProvider>
          </Suspense>
          <WhatsAppButton />
          <SEODebuggerTrigger />
        </SEOOptimizer>
      </body>
    </html>
  );
}
