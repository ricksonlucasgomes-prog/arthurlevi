import type { Metadata, Viewport } from 'next';
import { Anton, Archivo, JetBrains_Mono } from 'next/font/google';
import { isIndexable, siteConfig } from '@/data/site';
import { Providers } from '@/components/providers';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { PersonJsonLd } from '@/components/seo/person-json-ld';
import 'lenis/dist/lenis.css';
import './globals.css';

/**
 * Display — condensada e pesada. Os títulos funcionam como elemento gráfico,
 * não como texto decorado.
 */
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

/** Texto corrido — grotesca de alta legibilidade, variável. */
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

/** Rótulos técnicos — vocabulário de scouting e transmissão esportiva. */
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-tech',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'Arthur Levi',
    'Arthur Levi futebol',
    'Arthur Levi atacante',
    'jogador Arthur Levi',
    'jovem atleta Arthur Levi',
    'atacante categoria de base',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    locale: 'pt_BR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — atacante`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: isIndexable
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
      }
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
  category: 'sports',
};

export const viewport: Viewport = {
  themeColor: '#080808',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${archivo.variable} ${mono.variable} antialiased`}
    >
      <body className="grain min-h-svh bg-ink text-bone">
        <PersonJsonLd />
        <Providers>
          <Navigation />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
