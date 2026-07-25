'use client';

import { useState } from 'react';
import type { Highlight } from '@/data/player';
import { cn } from '@/lib/utils';
import { MediaFrame } from './media-frame';
import { PlayGlyph } from './action';

/**
 * Player em fachada: nada de terceiros carrega até o usuário dar play.
 * Isso mantém o Lighthouse alto e evita cookies do YouTube/Vimeo em uma
 * página sobre um menor de idade (usamos youtube-nocookie de qualquer forma).
 */
export function VideoEmbed({ highlight, className }: { highlight: Highlight; className?: string }) {
  const [playing, setPlaying] = useState(false);
  const ready = Boolean(highlight.ref);

  return (
    <div className={cn('relative aspect-video w-full overflow-hidden bg-carbon', className)}>
      {playing && highlight.ref ? (
        <Frame provider={highlight.provider} reference={highlight.ref} title={highlight.title} />
      ) : (
        <>
          <MediaFrame
            slot={highlight.poster}
            className="absolute inset-0 h-full w-full"
            sizes="(min-width: 1024px) 70vw, 100vw"
            overlay={ready}
          />

          {ready ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              data-cursor="play"
              aria-label={`Reproduzir vídeo: ${highlight.title}`}
              className="group absolute inset-0 flex items-center justify-center"
            >
              <span className="flex items-center gap-4 border border-bone/40 bg-ink/40 px-8 py-5 backdrop-blur-sm transition-colors duration-500 group-hover:border-bone group-hover:bg-accent group-hover:text-ink">
                <PlayGlyph />
                <span className="kicker">Assistir</span>
              </span>
            </button>
          ) : (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-6">
              <span className="kicker border border-line px-4 py-3 text-ash">
                Vídeo aguardando envio
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Frame({
  provider,
  reference,
  title,
}: {
  provider: Highlight['provider'];
  reference: string;
  title: string;
}) {
  if (provider === 'local') {
    return (
      <video
        src={reference}
        controls
        autoPlay
        playsInline
        className="h-full w-full bg-ink object-contain"
      >
        <track kind="captions" />
      </video>
    );
  }

  const src =
    provider === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${reference}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
      : `https://player.vimeo.com/video/${reference}?autoplay=1&title=0&byline=0&portrait=0`;

  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      allowFullScreen
      className="h-full w-full border-0"
    />
  );
}
