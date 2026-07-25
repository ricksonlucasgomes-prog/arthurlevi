'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { highlights, sectionIndex } from '@/data/player';
import { clipReveal, fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/section';
import { VideoEmbed } from '@/components/ui/video-embed';

/**
 * Seção de vídeo. Suporta YouTube, Vimeo e arquivo local, e já está
 * preparada para vários highlights — a lista secundária aparece sozinha
 * assim que houver mais de um item em `player.highlights`.
 */
export function Highlights() {
  const [selected, setSelected] = useState(0);
  const current = highlights[selected] ?? highlights[0];
  const published = highlights.filter((item) => item.ref !== null).length;

  if (!current) return null;

  return (
    <Section
      id="highlights"
      index={sectionIndex.highlights}
      title="Highlights"
      lead="Melhores momentos em vídeo. O player carrega o conteúdo apenas quando você dá play."
      tone="carbon"
    >
      <motion.div
        variants={clipReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <VideoEmbed highlight={current} />
      </motion.div>

      <motion.div
        variants={stagger(0.05, 0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12"
      >
        <motion.div variants={fadeUp}>
          <h3 className="font-display text-2xl leading-none md:text-3xl">{current.title}</h3>
          <p className="kicker mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-ash">
            <span>{providerLabel(current.provider)}</span>
            {current.date ? <span>{current.date}</span> : null}
            {current.duration ? <span>{current.duration}</span> : null}
          </p>
          {current.description ? (
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-ash">
              {current.description}
            </p>
          ) : null}
        </motion.div>

        {highlights.length > 1 ? (
          <motion.ul variants={fadeUp} className="flex w-full flex-col gap-px bg-line md:max-w-sm">
            {highlights.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelected(index)}
                  aria-current={index === selected ? 'true' : undefined}
                  className={cn(
                    'flex w-full items-center justify-between gap-4 bg-carbon px-4 py-4 text-left transition-colors duration-300 hover:bg-graphite',
                    index === selected && 'bg-graphite',
                  )}
                >
                  <span className="text-sm leading-tight">{item.title}</span>
                  <span
                    className={cn('kicker shrink-0', index === selected ? 'text-accent' : 'text-ash')}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </motion.div>

      {published === 0 ? (
        <p className="mt-10 max-w-[68ch] text-sm leading-relaxed text-ash">
          Para publicar um vídeo, abra{' '}
          <code className="font-mono text-xs text-bone">src/data/player.ts</code> e preencha{' '}
          <code className="font-mono text-xs text-bone">ref</code> no highlight: o ID do vídeo no
          YouTube ou Vimeo, ou o caminho do arquivo em{' '}
          <code className="font-mono text-xs text-bone">/public/media/highlights/</code>. Duplique o
          objeto para adicionar mais vídeos.
        </p>
      ) : null}
    </Section>
  );
}

function providerLabel(provider: 'youtube' | 'vimeo' | 'local') {
  if (provider === 'youtube') return 'YouTube';
  if (provider === 'vimeo') return 'Vimeo';
  return 'Vídeo próprio';
}
