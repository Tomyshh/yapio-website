import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";



export const metadata: Metadata = {
  title: "YAPIO - Développement d'Applications Mobile, Desktop & Web",
  description: "YAPIO - Société de développement d'applications mobiles, desktop et web. Solutions innovantes et performantes pour votre entreprise.",
  keywords: "développement application, mobile app, desktop app, web app, développeur, YAPIO",
  authors: [{ name: "YAPIO" }],
  openGraph: {
    title: "YAPIO - Développement d'Applications",
    description: "Solutions innovantes pour applications mobiles, desktop et web",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
