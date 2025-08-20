import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YAPIO - Développement d\'Applications Mobile, Desktop & Web',
    short_name: 'YAPIO',
    description: 'Société de développement d\'applications mobiles, desktop et web. Solutions innovantes et performantes pour votre entreprise.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    categories: ['business', 'productivity', 'developer'],
    lang: 'fr',
    icons: [
      {
        src: '/branding/icononly_transparent_nobuffer.png',
        sizes: '16x16',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/branding/icononly_transparent_nobuffer.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/branding/icononly_transparent_nobuffer.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/branding/icononly_transparent_nobuffer.png',
        sizes: '64x64',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/branding/icononly_transparent_nobuffer.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/branding/icononly_transparent_nobuffer.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/branding/icononly_transparent_nobuffer.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/branding/icononly_transparent_nobuffer.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    screenshots: [
      {
        src: '/branding/fulllogo_nobuffer.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Page d\'accueil YAPIO',
      },
    ],
  }
}
