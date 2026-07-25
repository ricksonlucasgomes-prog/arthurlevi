import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Existe um package-lock.json solto em ~/ que fazia o Turbopack eleger a home
  // do usuário como raiz do workspace. Fixamos a raiz na pasta do projeto.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // AVIF primeiro: arquivos menores para as fotos grandes do site.
    formats: ['image/avif', 'image/webp'],
    // Larguras alinhadas aos breakpoints reais usados no layout.
    deviceSizes: [420, 640, 768, 1024, 1280, 1600, 1920, 2560],
    imageSizes: [80, 128, 256, 384],
  },
  // Cabeçalhos de segurança básicos — site público sobre um menor de idade.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
