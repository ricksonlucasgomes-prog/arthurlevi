'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { editorial, gallery } from '@/data/player';
import { useMotionOK } from '@/hooks/use-motion-ok';
import { MediaFrame } from '@/components/ui/media-frame';

/**
 * Interlúdio imersivo inspirado na linguagem de trailers: fotografia em tela
 * cheia, máscara que se abre e tipografia que atravessa planos diferentes.
 * Usa somente um registro real já cadastrado na fonte única de dados.
 */
export function CinematicBreak() {
  const ref = useRef<HTMLElement>(null);
  const { animate } = useMotionOK();
  const image = gallery.find((item) => item.src !== null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const clipPath = useTransform(
    scrollYProgress,
    [0.05, 0.34, 0.72, 0.95],
    [
      'inset(14% 8% 14% 8%)',
      'inset(0% 0% 0% 0%)',
      'inset(0% 0% 0% 0%)',
      'inset(10% 6% 10% 6%)',
    ],
  );
  const firstX = useTransform(scrollYProgress, [0.18, 0.52], ['-14%', '0%']);
  const lastX = useTransform(scrollYProgress, [0.34, 0.7], ['14%', '0%']);

  if (!image) return null;

  return (
    <section
      ref={ref}
      aria-labelledby="cinematic-title"
      className="relative h-[150svh] border-y border-line bg-ink"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          style={animate ? { clipPath } : undefined}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div
            style={animate ? { scale, y: imageY } : undefined}
            className="absolute -inset-y-[8%] inset-x-0"
          >
            <MediaFrame
              slot={image}
              className="h-full w-full [&_img]:object-cover [&_img]:object-[54%_center]"
              sizes="100vw"
            />
          </motion.div>
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.18),rgba(5,7,10,0.1)_38%,rgba(5,7,10,0.88))]"
          />
        </motion.div>

        <div className="shell relative z-10 flex h-full flex-col justify-between py-24 md:py-28">
          <p className="kicker flex items-center gap-3 text-accent">
            <span aria-hidden className="h-px w-10 bg-accent" />
            {editorial.cinematic.eyebrow}
          </p>

          <div>
            <h2
              id="cinematic-title"
              className="font-display text-[clamp(3.6rem,12.5vw,11rem)] uppercase leading-[0.8] tracking-[-0.025em]"
            >
              <motion.span style={animate ? { x: firstX } : undefined} className="block">
                {editorial.cinematic.lines[0]}
              </motion.span>
              <span className="block text-accent">{editorial.cinematic.lines[1]}</span>
              <motion.span
                style={animate ? { x: lastX } : undefined}
                className="block text-right"
              >
                {editorial.cinematic.lines[2]}
              </motion.span>
            </h2>
            <p className="mt-7 max-w-[42ch] text-sm leading-relaxed text-bone/75 md:text-base">
              {editorial.cinematic.body}
            </p>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-4 z-20 border border-bone/10 md:inset-8"
        />
      </div>
    </section>
  );
}
