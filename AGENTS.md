<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Projeto — Site do atleta Arthur Levi

Site profissional de **Arthur Levi**, atacante, 12 anos. Objetivo: apresentá-lo
a olheiros, clubes e treinadores de formação.

Stack: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind
CSS 4 · Motion (pacote `motion`, import de `motion/react` — **não**
`framer-motion`).

Idioma do produto e dos comentários de código: **português do Brasil**.

## Regras invioláveis

Estas quatro regras vêm do briefing do cliente. Quebrar qualquer uma delas
descaracteriza o projeto.

1. **Nunca inventar dado do atleta.** Nada de altura, peso, nota de scouting,
   estatística, conquista ou descrição de estilo de jogo que não tenha sido
   fornecido. `null` = "ainda não informado" e a UI mostra estado neutro
   (`—`, hachura diagonal, "aguardando"). `0` é um dado; ausência é outra
   coisa. Quem lê isso é olheiro.

2. **Nunca gerar imagem ou vídeo.** Sem IA, sem banco de imagens, sem SVG
   "decorativo" fingindo ser foto. Onde falta mídia, o componente
   `MediaFrame` desenha um placeholder técnico com o caminho exato do arquivo
   esperado. O cliente envia as fotos reais.

3. **Proteção do menor (12 anos).** Não publicar endereço, escola, telefone ou
   e-mail pessoal do atleta, rotina, horários/locais de treino ou qualquer
   localização. Todo contato passa pelo responsável legal (`guardianContact`).
   O JSON-LD omite de propósito data de nascimento e endereço.

4. **Não é site infantil nem template de futebol.** A direção é editorial,
   cinematográfica, esportiva premium. Evitar: excesso de cards, cantos
   arredondados, gradientes genéricos, visual SaaS/dashboard, emojis, excesso
   de ícones, neon, estética gamer.

## Onde mexer

**Todo o conteúdo está em `src/data/player.ts`** — fonte única de dados.
Atualizar o perfil nunca deve exigir editar um componente. Se você se pegar
escrevendo texto do atleta dentro de um `.tsx`, está no lugar errado.

```
src/
  app/          layout (metadata, fontes, JSON-LD), page (ordem das seções),
                pendencias/ (checklist interno, noindex), robots.ts, sitemap.ts
  data/         player.ts (DADOS), site.ts (domínio, SEO, menu)
  components/   hero/ layout/ sections/ ui/ seo/
  hooks/        useMediaQuery (useSyncExternalStore), useMotionOK
  lib/          motion.ts (variantes/easings), utils.ts (cn, whatsappLink)
```

`display.showPendingSections` em `player.ts`: `true` mostra seções vazias em
"modo preparado" (para revisar layout); `false` some com elas na página
pública. Deve virar `false` antes de divulgar.

## Direção de arte

Fundo `#080808` / `#111111` · texto `#F5F5F2` · cinza `#8D8D8D` · destaque
**único** `#FF3B1F` (contraste 5,6:1, AA). Display **Anton**, texto
**Archivo**, técnico **JetBrains Mono**.

Tokens em `src/app/globals.css` (`@theme`). Classes utilitárias próprias:
`.shell` (container), `.kicker` (rótulo mono), `.hatch` (campo pendente),
`.grain`, `.underline-grow`.

## Motion

`useMotionOK()` separa dois tipos de movimento:
- `animate` — narrativo (reveal, parallax de scroll, contadores). Desliga em
  `prefers-reduced-motion`.
- `interact` — ponteiro (cursor customizado, magnetismo, parallax de mouse).
  Exige ponteiro preciso; **nunca** roda em toque.

Mobile é prioridade e tem comportamento próprio, não é desktop reduzido
(galeria vira rail com snap, menu vira tela cheia).

## Comandos

```bash
npm run dev        # http://localhost:3000
npm run build      # todas as rotas devem sair estáticas
npm run lint       # ESLint — manter zero warnings
npm run typecheck  # tsc --noEmit
```

Antes de entregar qualquer alteração: `typecheck` + `lint` + `build`.

`/pendencias` lista o que ainda falta o cliente enviar; ela se atualiza
sozinha a partir de `player.ts`.

## Estado atual

Site completo e funcional, build passando, todas as rotas estáticas.
**Nenhuma foto, vídeo ou dado pessoal foi fornecido ainda** — tudo está como
placeholder identificado. Pendências prioritárias: `hero-bg.webp`,
`hero-cutout.png` (PNG transparente, é a camada que cria a profundidade da
hero), ficha física/clube e o contato do responsável.

Especificação de cada arquivo de mídia: `public/media/README.md`.
