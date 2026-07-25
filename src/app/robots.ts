import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';

/**
 * O bloqueio de indexação NÃO é feito aqui, e sim pelo `noindex` emitido no
 * metadata (ver `isIndexable` em `src/data/site.ts`). É proposital: um
 * `Disallow` impediria o rastreador de ler a própria tag `noindex`, e uma URL
 * apenas bloqueada por robots.txt ainda pode ser indexada se alguém a linkar.
 * Permitir o rastreamento é o que garante que o `noindex` seja obedecido.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // A página de pendências é uso interno da família — fora do índice.
      disallow: ['/pendencias'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
