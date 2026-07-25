/**
 * Configuração global do site.
 *
 * Defina NEXT_PUBLIC_SITE_URL no ambiente de produção (ex.: Vercel) com o
 * domínio final. O valor abaixo é apenas o fallback de desenvolvimento.
 */
/**
 * Enquanto `false`, o site emite `noindex, nofollow`: o link continua abrindo
 * normalmente e pode ser enviado a quem se queira, mas buscadores não o
 * incluem no índice.
 *
 * Só vire para `true` (definindo `SITE_INDEXABLE=true` no ambiente da Vercel)
 * quando o site estiver de fato pronto para o público — em especial com
 * `guardianContact` preenchido, senão um olheiro encontra a página e não tem
 * como fazer contato. Indexação é fácil de ligar e difícil de desfazer, ainda
 * mais tratando-se de um menor de idade.
 */
export const isIndexable = process.env.SITE_INDEXABLE === 'true';

export const siteConfig = {
  /** [AGUARDANDO DEFINIÇÃO] Domínio final do site. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arthurlevi-71kc.vercel.app',
  name: 'Arthur Levi',
  title: 'Arthur Levi — Atacante | Jovem Atleta de Futebol',
  shortTitle: 'Arthur Levi',
  description:
    'Perfil esportivo de Arthur Levi, atacante de 12 anos em formação. Informações, registros de jogo e contato profissional através do responsável legal.',
  locale: 'pt-BR',
  /** Imagem de compartilhamento — 1200x630. Substituir por foto real. */
  ogImage: '/media/og-image.jpg',
} as const;

/**
 * Navegação principal. A ordem define a narrativa da página e o índice
 * numérico exibido em cada seção.
 */
export const navigation = [
  { id: 'perfil', label: 'Perfil' },
  { id: 'em-campo', label: 'Em campo' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'numeros', label: 'Números' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'contato', label: 'Contato' },
] as const;

export type NavItem = (typeof navigation)[number];
