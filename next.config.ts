import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  basePath: '',

  // Optimisations SEO
  compress: true,
  poweredByHeader: false,

  // Avec output: 'export', headers() et redirects() ici sont ignorés par Next
  // (export statique = pas de serveur Node). Équivalent en prod : vercel.json.

  // Configuration du build pour l'optimisation
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'react-intersection-observer',
      '@supabase/supabase-js',
      '@paper-design/shaders-react',
    ],
    // Optimiser les imports pour réduire la taille du bundle
    optimizeCss: true,
  },

  // Configuration Turbopack (stable)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Optimisations webpack
  webpack: (config, { dev, isServer }) => {
    // Optimisations pour la production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },

  // Configuration du compilateur
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
