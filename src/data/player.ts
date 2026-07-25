/**
 * ============================================================================
 * ARTHUR LEVI — FONTE ÚNICA DE DADOS
 * ============================================================================
 *
 * Todo o conteúdo do site vem deste arquivo. Para atualizar o perfil do
 * atleta você NÃO precisa tocar em nenhum componente.
 *
 * REGRA INEGOCIÁVEL
 * -----------------
 * `null` significa "informação ainda não fornecida". A interface trata `null`
 * como pendência e mostra um estado neutro ("—" / "aguardando"). NUNCA
 * preencha um campo com estimativa, arredondamento ou suposição: os dados
 * daqui são lidos por olheiros e precisam ser verdadeiros.
 *
 * PROTEÇÃO DO MENOR (Arthur tem 12 anos)
 * --------------------------------------
 * É proibido registrar aqui: endereço residencial, nome da escola, telefone
 * ou e-mail pessoal do atleta, rotina, horários e locais de treino, ou
 * qualquer dado que permita localizá-lo. Todo contato é intermediado pelo
 * responsável legal (ver `guardianContact`).
 */

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

/** Campo que ainda aguarda informação real do responsável. */
export type Pending<T> = T | null;

/**
 * Referência a um arquivo de mídia.
 * Enquanto `src` for `null`, a interface renderiza um placeholder informando
 * exatamente qual arquivo deve ser colocado em `expectedPath`.
 */
export interface MediaSlot {
  /** Caminho público do arquivo depois de enviado. `null` = ainda não existe. */
  src: Pending<string>;
  /** Onde o arquivo deve ser salvo dentro de /public. */
  expectedPath: string;
  /** Texto alternativo (acessibilidade + SEO). Ajuste ao enviar a foto real. */
  alt: string;
  /** Instrução curta do que a foto precisa mostrar. */
  brief: string;
  /** Dimensão mínima recomendada. */
  spec: string;
}

export type Aspect = 'portrait' | 'landscape' | 'square' | 'tall' | 'wide';

export interface GalleryItem extends MediaSlot {
  id: string;
  aspect: Aspect;
  /** Rótulo editorial curto exibido no hover. Ex.: "Treino", "Jogo". */
  tag: string;
  caption: Pending<string>;
}

export type VideoProvider = 'youtube' | 'vimeo' | 'local';

export interface Highlight {
  id: string;
  title: string;
  /** youtube/vimeo: ID do vídeo. local: caminho em /public. `null` = pendente. */
  ref: Pending<string>;
  provider: VideoProvider;
  /** Ex.: "Março 2026". Mantenha genérico — não expor rotina/localização. */
  date: Pending<string>;
  duration: Pending<string>;
  description: Pending<string>;
  poster: MediaSlot;
}

export interface Attribute {
  key: string;
  label: string;
  /** 0–100. `null` enquanto não houver avaliação técnica real. */
  value: Pending<number>;
  /** Quem avaliou. Sem isso, o número não tem valor para um olheiro. */
  source: Pending<string>;
}

export interface Trait {
  key: string;
  label: string;
  /** Descrição confirmada pelo responsável/treinador. `null` = pendente. */
  body: Pending<string>;
}

export interface TimelineEntry {
  id: string;
  /** Ex.: "2024 — 2025". */
  period: string;
  title: string;
  club: Pending<string>;
  category: Pending<string>;
  description: Pending<string>;
  kind: 'clube' | 'competicao' | 'avaliacao' | 'conquista' | 'formacao';
}

export interface SeasonStats {
  id: string;
  season: string;
  competition: Pending<string>;
  matches: Pending<number>;
  goals: Pending<number>;
  assists: Pending<number>;
  minutes: Pending<number>;
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  competition: Pending<string>;
  detail: Pending<string>;
  kind: 'titulo' | 'individual' | 'artilharia' | 'convocacao';
}

// ---------------------------------------------------------------------------
// Identidade — dados confirmados
// ---------------------------------------------------------------------------

export const identity = {
  firstName: 'Arthur',
  lastName: 'Levi',
  fullName: 'Arthur Levi',
  age: 12,
  position: 'Atacante',
  positionShort: 'ATA',
  tagline: 'Construindo seu caminho para o futebol profissional.',
  /** Frase editorial de abertura da seção de perfil. */
  statement: 'Doze anos. Uma posição. Um objetivo definido.',
} as const;

// ---------------------------------------------------------------------------
// Perfil — [AGUARDANDO INFORMAÇÃO]
// ---------------------------------------------------------------------------

export const bio = {
  city: null as Pending<string>,
  state: null as Pending<string>,
  club: null as Pending<string>,
  category: null as Pending<string>,
  shirtNumber: null as Pending<number>,
  /** Ano de início no clube atual. */
  clubSince: null as Pending<string>,
  /** Escudo do clube, quando houver autorização de uso. */
  clubCrest: {
    src: null,
    expectedPath: '/media/club-crest.svg',
    alt: 'Escudo do clube atual de Arthur Levi',
    brief: 'Escudo do clube/equipe atual, preferencialmente em SVG ou PNG transparente.',
    spec: 'SVG (ideal) ou PNG 512×512 com fundo transparente',
  } satisfies MediaSlot,
};

export const physical = {
  height: null as Pending<string>,
  weight: null as Pending<string>,
  dominantFoot: null as Pending<'Direito' | 'Esquerdo' | 'Ambidestro'>,
};

// ---------------------------------------------------------------------------
// Atributos de scouting — estrutura pronta, SEM notas inventadas
// ---------------------------------------------------------------------------

export const attributes: Attribute[] = [
  { key: 'velocidade', label: 'Velocidade', value: null, source: null },
  { key: 'finalizacao', label: 'Finalização', value: null, source: null },
  { key: 'drible', label: 'Drible', value: null, source: null },
  { key: 'movimentacao', label: 'Movimentação', value: null, source: null },
  { key: 'passe', label: 'Passe', value: null, source: null },
  { key: 'intensidade', label: 'Intensidade', value: null, source: null },
];

// ---------------------------------------------------------------------------
// Em campo — características (texto a ser confirmado)
// ---------------------------------------------------------------------------

export const traits: Trait[] = [
  { key: 'estilo', label: 'Estilo de jogo', body: null },
  { key: 'movimentacao', label: 'Movimentação', body: null },
  { key: 'finalizacao', label: 'Finalização', body: null },
  { key: 'sem-bola', label: 'Comportamento sem bola', body: null },
  { key: 'visao', label: 'Visão de jogo', body: null },
  { key: 'fisico', label: 'Características físicas', body: null },
];

// ---------------------------------------------------------------------------
// Mídia
// ---------------------------------------------------------------------------

export const media = {
  /** Camada de fundo da hero — cena ampla, contexto de jogo. */
  heroBackground: {
    src: null,
    expectedPath: '/media/hero-bg.webp',
    alt: 'Arthur Levi em campo durante partida',
    brief:
      'Foto vertical/ampla do Arthur em campo. Deixe espaço vazio à esquerda — a tipografia ocupa esse lado.',
    spec: '2000×2600 px mínimo, WebP ou JPG de alta qualidade',
  } satisfies MediaSlot,

  /**
   * Recorte do Arthur com fundo transparente. É esta camada que passa por
   * cima do nome e cria a profundidade da hero. Opcional, mas é o elemento
   * que mais eleva o resultado final.
   */
  heroCutout: {
    src: null,
    expectedPath: '/media/hero-cutout.png',
    alt: 'Arthur Levi em pose de atacante',
    brief:
      'MESMA foto da hero, porém com o fundo removido (PNG transparente). Corpo inteiro ou 3/4, olhando para a câmera.',
    spec: 'PNG transparente, 1600×2200 px mínimo',
  } satisfies MediaSlot,

  /** Retrato editorial usado na seção de perfil. */
  portrait: {
    src: null,
    expectedPath: '/media/portrait.webp',
    alt: 'Retrato de Arthur Levi com o uniforme de jogo',
    brief: 'Retrato vertical, meio corpo, uniforme de jogo, fundo limpo ou desfocado.',
    spec: '1400×1900 px mínimo',
  } satisfies MediaSlot,

  /** Foto de apoio da seção "Em campo". */
  onPitch: {
    src: null,
    expectedPath: '/media/em-campo.webp',
    alt: 'Arthur Levi conduzindo a bola em campo',
    brief: 'Foto horizontal de ação: condução, arrancada ou finalização.',
    spec: '2000×1250 px mínimo',
  } satisfies MediaSlot,

  /** Faixa larga usada antes do CTA para olheiros. */
  scouting: {
    src: null,
    expectedPath: '/media/scouting.webp',
    alt: 'Arthur Levi durante treino',
    brief: 'Foto horizontal ampla, preferencialmente com pouca informação no centro.',
    spec: '2400×1200 px mínimo',
  } satisfies MediaSlot,
};

/**
 * Galeria editorial. As proporções foram escolhidas para compor um grid
 * assimétrico — mantenha a variedade ao enviar as fotos.
 */
export const gallery: GalleryItem[] = [
  {
    id: 'g1',
    src: null,
    expectedPath: '/media/galeria/01-acao.webp',
    aspect: 'tall',
    tag: 'Jogo',
    alt: 'Arthur Levi em disputa de bola durante partida',
    caption: null,
    brief: 'Vertical, momento de ação em jogo.',
    spec: '1200×1800 px',
  },
  {
    id: 'g2',
    src: null,
    expectedPath: '/media/galeria/02-close.webp',
    aspect: 'square',
    tag: 'Retrato',
    alt: 'Close no rosto de Arthur Levi concentrado',
    caption: null,
    brief: 'Close no rosto — concentração, respiração, expressão.',
    spec: '1400×1400 px',
  },
  {
    id: 'g3',
    src: null,
    expectedPath: '/media/galeria/03-treino.webp',
    aspect: 'landscape',
    tag: 'Treino',
    alt: 'Arthur Levi durante sessão de treino',
    caption: null,
    brief: 'Horizontal, treino técnico com bola.',
    spec: '1800×1200 px',
  },
  {
    id: 'g4',
    src: null,
    expectedPath: '/media/galeria/04-finalizacao.webp',
    aspect: 'portrait',
    tag: 'Finalização',
    alt: 'Arthur Levi finalizando a gol',
    caption: null,
    brief: 'Vertical, momento do chute ou cabeceio.',
    spec: '1200×1600 px',
  },
  {
    id: 'g5',
    src: null,
    expectedPath: '/media/galeria/05-momento.webp',
    aspect: 'wide',
    tag: 'Momento',
    alt: 'Arthur Levi com os companheiros de equipe antes da partida',
    caption: null,
    brief: 'Horizontal ampla — entrada em campo, perfilado ou comemoração.',
    spec: '2400×1200 px',
  },
  {
    id: 'g6',
    src: null,
    expectedPath: '/media/galeria/06-velocidade.webp',
    aspect: 'portrait',
    tag: 'Velocidade',
    alt: 'Arthur Levi em arrancada pela lateral do campo',
    caption: null,
    brief: 'Vertical, corpo inteiro em corrida.',
    spec: '1200×1600 px',
  },
];

/**
 * Highlights. Estrutura pronta para múltiplos vídeos.
 * Para publicar: defina `provider` e preencha `ref`.
 *   youtube → ref = ID do vídeo (ex.: 'dQw4w9WgXcQ')
 *   vimeo   → ref = ID numérico (ex.: '76979871')
 *   local   → ref = '/media/highlights/arquivo.mp4'
 */
export const highlights: Highlight[] = [
  {
    id: 'h1',
    title: 'Compacto — melhores momentos',
    ref: null,
    provider: 'youtube',
    date: null,
    duration: null,
    description: null,
    poster: {
      src: null,
      expectedPath: '/media/highlights/poster-01.webp',
      alt: 'Capa do vídeo de melhores momentos de Arthur Levi',
      brief: 'Frame marcante do vídeo, usado como capa antes do play.',
      spec: '1920×1080 px',
    },
  },
];

// ---------------------------------------------------------------------------
// Números, trajetória e conquistas — vazios até existirem dados reais
// ---------------------------------------------------------------------------

/** Temporada em destaque no topo da seção de números. */
export const currentSeason: Pending<string> = null;

export const statistics: SeasonStats[] = [];

export const career: TimelineEntry[] = [];

export const achievements: Achievement[] = [];

// ---------------------------------------------------------------------------
// Redes sociais do atleta (perfis públicos administrados pelo responsável)
// ---------------------------------------------------------------------------

export const social = {
  instagram: null as Pending<string>,
  youtube: null as Pending<string>,
  tiktok: null as Pending<string>,
};

// ---------------------------------------------------------------------------
// Contato do responsável legal — ÚNICO canal de contato do site
// ---------------------------------------------------------------------------

export const guardianContact = {
  name: null as Pending<string>,
  /** Ex.: 'Pai', 'Mãe', 'Responsável legal'. */
  relationship: null as Pending<string>,
  /** Somente dígitos, com DDI + DDD. Ex.: '5511999999999'. */
  whatsapp: null as Pending<string>,
  email: null as Pending<string>,
  note: 'Todo contato referente ao atleta é intermediado pelo responsável legal.',
};

// ---------------------------------------------------------------------------
// Configuração de exibição
// ---------------------------------------------------------------------------

export const display = {
  /**
   * `true`  → seções sem dados aparecem em "modo preparado", com a estrutura
   *           visível e marcada como aguardando informação. Use durante a
   *           montagem do site para revisar o layout.
   * `false` → seções sem nenhum dado real desaparecem da página pública.
   *
   * TROQUE PARA `false` ANTES DE DIVULGAR O SITE.
   */
  showPendingSections: true,
};

// ---------------------------------------------------------------------------
// Objeto agregado
// ---------------------------------------------------------------------------

export const player = {
  identity,
  bio,
  physical,
  attributes,
  traits,
  media,
  gallery,
  highlights,
  currentSeason,
  statistics,
  career,
  achievements,
  social,
  guardianContact,
  display,
};

export type Player = typeof player;
