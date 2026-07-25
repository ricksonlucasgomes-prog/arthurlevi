# Mídia — o que enviar

Coloque os arquivos **exatamente com estes nomes**, nesta pasta. Assim que um
arquivo existir, preencha o campo `src` correspondente em
`src/data/player.ts` (de `null` para o caminho, ex.: `'/media/hero-bg.webp'`)
e o placeholder some sozinho.

A lista sempre atualizada fica em **http://localhost:3000/pendencias**.

---

## Prioridade 1 — a primeira tela

| Arquivo | O que precisa mostrar | Tamanho mínimo |
|---|---|---|
| `hero-bg.webp` | Arthur em campo, cena ampla. **Deixe espaço vazio à esquerda** — a tipografia ocupa esse lado. | 2000×2600 |
| `hero-cutout.png` | A **mesma** foto da hero com o fundo removido (PNG transparente). É esta camada que passa por cima do nome e cria a profundidade. | 1600×2200, transparente |

> O `hero-cutout.png` é o arquivo de maior impacto visual do site inteiro.
> Sem ele a hero funciona, mas perde o efeito de profundidade em camadas.

## Prioridade 2 — seções principais

| Arquivo | O que precisa mostrar | Tamanho mínimo |
|---|---|---|
| `portrait.webp` | Retrato vertical, meio corpo, uniforme de jogo, fundo limpo ou desfocado. | 1400×1900 |
| `em-campo.webp` | Ação horizontal: condução, arrancada ou finalização. | 2000×1250 |
| `scouting.webp` | Horizontal ampla, com pouca informação no centro (o texto do CTA fica por cima). | 2400×1200 |
| `og-image.jpg` | Imagem de compartilhamento em WhatsApp/redes. Rosto do Arthur + nome. | 1200×630 exatos |
| `club-crest.svg` | Escudo do clube atual — **só envie se houver autorização de uso da marca**. | SVG ou PNG 512×512 |

## Galeria — `/media/galeria/`

Mantenha a variedade de proporções: a composição foi desenhada para essa mistura.

| Arquivo | Proporção | O que mostrar |
|---|---|---|
| `01-acao.webp` | vertical | Disputa de bola em jogo |
| `02-close.webp` | quadrada | Close no rosto, concentração |
| `03-treino.webp` | horizontal | Treino técnico com bola |
| `04-finalizacao.webp` | vertical | Momento do chute ou cabeceio |
| `05-momento.webp` | horizontal ampla | Entrada em campo, perfilado ou comemoração |
| `06-velocidade.webp` | vertical | Corpo inteiro em corrida |

## Highlights — `/media/highlights/`

- `poster-01.webp` (1920×1080) — frame de capa exibido antes do play.
- Vídeo: **não precisa** subir o arquivo aqui se ele estiver no YouTube ou
  Vimeo. Basta informar o ID em `player.highlights[].ref`.

---

## Formato

- **Fotos:** WebP ou JPG de alta qualidade. O Next.js converte para AVIF/WebP
  e gera automaticamente os tamanhos para cada tela — envie sempre o arquivo
  grande, nunca já reduzido.
- **Recortes:** PNG com transparência real (não fundo branco).
- **Nomes:** minúsculos, sem acento e sem espaço.

## Proteção do atleta

Não envie fotos que mostrem endereço, fachada de casa ou escola, placa de rua,
uniforme escolar ou qualquer coisa que permita localizar o Arthur.
