# Arthur Levi — site do atleta

Site profissional de **Arthur Levi**, atacante, 12 anos. O objetivo é
apresentar o atleta a olheiros, clubes e treinadores de formação.

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion

---

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Sobe o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificação de tipos |

**http://localhost:3000/pendencias** — página interna (não indexada) que lista
tudo que ainda falta enviar. Ela se atualiza sozinha conforme os dados são
preenchidos.

---

## Como atualizar o conteúdo

Todo o conteúdo do site está em **um único arquivo**:

```
src/data/player.ts
```

Nenhum componente precisa ser editado para atualizar o perfil.

### A regra do `null`

`null` significa **"ainda não informado"**. A interface trata `null` como
pendência e mostra um estado neutro (`—`, hachura, "aguardando").

> **Nunca** preencha um campo com estimativa, arredondamento ou suposição.
> Estes dados são lidos por olheiros — um número errado vale menos que um
> campo vazio, e `0` é um dado, não uma ausência.

### Exemplos

```ts
// Antes
physical.dominantFoot = null;
// Depois
physical.dominantFoot = 'Direito';
```

```ts
// Publicar um highlight do YouTube: basta o ID do vídeo
{ id: 'h1', provider: 'youtube', ref: 'dQw4w9WgXcQ', ... }

// Ou um arquivo próprio
{ id: 'h1', provider: 'local', ref: '/media/highlights/compacto.mp4', ... }
```

```ts
// Estatísticas: adicione temporadas — os totais são somados sozinhos
statistics = [
  { id: 's1', season: '2026', competition: 'Copa X',
    matches: 14, goals: 9, assists: 4, minutes: 980 },
];
```

### Antes de divulgar o site

```ts
display.showPendingSections = false;
```

Com `true` (padrão atual) as seções sem dados aparecem em "modo preparado",
para você revisar o layout. Com `false`, seções sem nenhuma informação real
— como Conquistas — **desaparecem da página pública**, conforme o briefing.

---

## Estrutura

```
src/
  app/
    layout.tsx           metadata, fontes, JSON-LD
    page.tsx             ordem das seções (a narrativa)
    pendencias/          checklist interno, noindex
    robots.ts sitemap.ts
  data/
    player.ts            FONTE ÚNICA DE DADOS
    site.ts              domínio, SEO, menu
  components/
    hero/                Hero, ScrollCue
    layout/              Navigation, Footer
    sections/            as 10 seções da página
    ui/                  MediaFrame, Reveal, Section, Action,
                         Counter, Magnetic, Cursor, VideoEmbed
    seo/                 PersonJsonLd
  hooks/                 useMediaQuery, useMotionOK
  lib/                   motion.ts (variantes), utils.ts
```

---

## Direção de arte

| | |
|---|---|
| Fundo | `#080808` / `#111111` |
| Texto | `#F5F5F2` |
| Cinza | `#8D8D8D` |
| Destaque | `#FF3B1F` — **uma única** cor de destaque |
| Display | Anton (títulos como elemento gráfico) |
| Texto | Archivo |
| Técnica | JetBrains Mono (rótulos, índices, dados) |

O accent tem contraste **5,6:1** sobre o fundo — aprovado em WCAG AA inclusive
para texto pequeno. Para trocar a cor pela identidade do clube, edite
`--color-accent` em `src/app/globals.css` e verifique o contraste antes.

---

## Decisões técnicas

**Placeholders em código, não imagens.** Nenhuma foto foi gerada ou
substituída por banco de imagens. Onde falta mídia, o componente `MediaFrame`
desenha um bloco técnico informando o caminho exato do arquivo esperado.

**Vídeo em fachada.** O player do YouTube/Vimeo só é injetado no clique —
nenhum script de terceiros carrega antes disso. Usamos `youtube-nocookie`.

**Movimento com política.** `useMotionOK()` separa animação narrativa
(desligada em `prefers-reduced-motion`) de interação de ponteiro (cursor,
magnetismo, parallax de mouse — nunca em telas de toque).

**Mobile não é desktop reduzido.** A galeria vira um rail horizontal com snap,
o menu é uma tela cheia com tipografia grande, e os efeitos de ponteiro
simplesmente não existem.

---

## Proteção do menor

Arthur tem 12 anos. O site **não publica** endereço, escola, telefone ou
e-mail pessoal do atleta, rotina, horários de treino ou qualquer localização.

Todo contato é intermediado pelo responsável legal, via `guardianContact` em
`src/data/player.ts`. Enquanto esse objeto estiver vazio, os botões de contato
aparecem desativados — o site nunca inventa um canal.

O JSON-LD de dados estruturados omite deliberadamente data de nascimento e
endereço.

---

## Deploy

Defina a variável de ambiente com o domínio final:

```
NEXT_PUBLIC_SITE_URL=https://seudominio.com.br
```

Ela alimenta canonical, OpenGraph, `sitemap.xml` e `robots.txt`.
