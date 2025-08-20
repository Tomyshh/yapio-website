import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Suspense } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";



export const metadata: Metadata = {
  title: "YAPIO - Développement d'Applications Mobile, Desktop & Web",
  description: "YAPIO - Société de développement d'applications mobiles, desktop et web. Solutions innovantes et performantes pour votre entreprise.",
  keywords: "développement application, mobile app, desktop app, web app, développeur, YAPIO",
  authors: [{ name: "YAPIO" }],
  icons: {
    icon: [
      { url: "/branding/icononly_transparent_nobuffer.png", sizes: "16x16", type: "image/png" },
      { url: "/branding/icononly_transparent_nobuffer.png", sizes: "32x32", type: "image/png" },
      { url: "/branding/icononly_transparent_nobuffer.png", sizes: "48x48", type: "image/png" },
      { url: "/branding/icononly_transparent_nobuffer.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/branding/icononly_transparent_nobuffer.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/branding/icononly_transparent_nobuffer.png",
  },
  openGraph: {
    title: "YAPIO - Développement d'Applications",
    description: "Solutions innovantes pour applications mobiles, desktop et web",
    type: "website",
    siteName: "YAPIO",
    images: [
      {
        url: "/branding/fulllogo_nobuffer.png",
        width: 1200,
        height: 630,
        alt: "YAPIO - Développement d'Applications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YAPIO - Développement d'Applications",
    description: "Solutions innovantes pour applications mobiles, desktop et web",
    images: ["/branding/fulllogo_nobuffer.png"],
  },
};

// Composant de chargement fluide
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <div className="text-gray-400 animate-pulse">Chargement...</div>
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
        {/* Préchargement des images pour éviter FOUT */}
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
        {/* Configuration pour éviter le flash de contenu non stylé */}
        <style>{`
          html { 
            font-display: swap;
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }
          html.loaded {
            visibility: visible;
            opacity: 1;
          }
          /* Skeleton loading pour le texte */
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Marquer le HTML comme chargé dès que possible
              document.addEventListener('DOMContentLoaded', function() {
                setTimeout(() => {
                  document.documentElement.classList.add('loaded');
                }, 100);
              });
              
              // Fallback si DOMContentLoaded ne se déclenche pas
              setTimeout(() => {
                document.documentElement.classList.add('loaded');
              }, 300);
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="transition-all duration-300">
        <Suspense fallback={<LoadingFallback />}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </Suspense>
        <WhatsAppButton />
      </body>
    </html>
  );
}
