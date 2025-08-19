import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";



export const metadata: Metadata = {
  title: "YAPIO - Développement d'Applications Mobile, Desktop & Web",
  description: "YAPIO - Société de développement d'applications mobiles, desktop et web. Solutions innovantes et performantes pour votre entreprise.",
  keywords: "développement application, mobile app, desktop app, web app, développeur, YAPIO",
  authors: [{ name: "YAPIO" }],
  icons: {
    icon: [
      { url: "/branding/icononly_nobuffer.png", sizes: "32x32", type: "image/png" },
      { url: "/branding/icononly_nobuffer.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/branding/icononly_nobuffer.png",
    shortcut: "/branding/icononly_nobuffer.png",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
