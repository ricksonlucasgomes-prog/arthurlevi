'use client';

import { motion } from 'motion/react';
import { display, gallery } from '@/data/player';
import { clipReveal, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/section';
import { MediaFrame } from '@/components/ui/media-frame';

/**
 * Composição editorial da galeria.
 *
 * As posições são desenhadas, não automáticas — é o que separa uma galeria
 * editorial de um grid de rede social. O padrão tem 6 posições e se repete
 * caso a galeria cresça.
 */
const layout = [
  'lg:col-start-1 lg:col-span-5 lg:aspect-[3/4]',
  'lg:col-start-7 lg:col-span-4 lg:mt-28 lg:aspect-square',
  'lg:col-start-2 lg:col-span-6 lg:-mt-16 lg:aspect-[4/3]',
  'lg:col-start-9 lg:col-span-4 lg:-mt-40 lg:aspect-[3/4]',
  'lg:col-start-1 lg:col-span-12 lg:mt-16 lg:aspect-[21/9]',
  'lg:col-start-4 lg:col-span-5 lg:mt-16 lg:aspect-[3/4]',
];

/** Proporção usada no mobile, onde a galeria vira um rail horizontal. */
const mobileAspect: Record<string, string> = {
  tall: 'aspect-[3/4.2]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
};

export function Gallery() {
  const visibleGallery = display.showPendingSections
    ? gallery
    : gallery.filter((item) => item.src !== null);

  return (
    <Section
      id="galeria"
      index="08"
      title="Galeria"
      lead="Jogo, treino e retrato. Envie fotos com proporções variadas — a composição foi desenhada para essa mistura."
    >
      <ul
        className={cn(
          // Mobile: rail horizontal com snap. Desktop: grid editorial.
          'no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2',
          'md:-mx-10 md:px-10',
          'lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0 lg:overflow-visible lg:px-0',
        )}
      >
        {visibleGallery.map((item, index) => (
          <motion.li
            key={item.id}
            variants={clipReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={cn(
              'group relative w-[78vw] shrink-0 snap-start sm:w-[56vw]',
              'lg:w-auto lg:shrink',
              mobileAspect[item.aspect],
              layout[index % layout.length],
            )}
          >
            <MediaFrame
              slot={item}
              className="h-full w-full [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[&_img]:scale-105"
              sizes="(min-width: 1024px) 45vw, 78vw"
              compact
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
              <span className="kicker bg-ink/70 px-3 py-2 backdrop-blur-sm">{item.tag}</span>
              <span className="kicker text-ash/70">{String(index + 1).padStart(2, '0')}</span>
            </div>

            {item.caption ? (
              <p className="kicker absolute -bottom-8 left-0 hidden text-ash lg:block">
                {item.caption}
              </p>
            ) : null}
          </motion.li>
        ))}
      </ul>

      <p className="kicker mt-6 text-ash lg:hidden">Arraste para o lado</p>
    </Section>
  );
}
