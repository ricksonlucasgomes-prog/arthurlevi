'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { editorial, identity, media, sectionIndex } from '@/data/player';
import { clipReveal, fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { useMotionOK } from '@/hooks/use-motion-ok';
import { cn } from '@/lib/utils';
import { MediaFrame } from '@/components/ui/media-frame';
import { MaskLine } from '@/components/ui/reveal';

/**
 * Abertura editorial. Não afirma nada sobre o desempenho do atleta — descreve
 * o propósito do material. Qualquer avaliação técnica precisa vir de fonte
 * identificada (ver seção de atributos).
 */
export function PlayerIntroduction() {
  const ref = useRef<HTMLDivElement>(null);
  const { animate } = useMotionOK();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      id="identidade"
      aria-labelledby="identidade-title"
      className="relative scroll-mt-20 border-t border-line py-20 md:py-28 lg:py-36"
    >
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Texto */}
        <motion.div
          variants={stagger(0, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-7 lg:pt-6"
        >
          <motion.p variants={fadeUp} className="kicker mb-8 text-accent">
            {sectionIndex.identidade} — Identidade
          </motion.p>

          <h2
            id="identidade-title"
            className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]"
          >
            {identity.statementLines.map((line, index) => (
              <MaskLine
                key={line}
                lineClassName={index === identity.statementLines.length - 1 ? 'text-accent' : undefined}
              >
                {line}
              </MaskLine>
            ))}
          </h2>

          <motion.div variants={fadeUp} className="mt-10 max-w-[54ch] space-y-5 text-ash">
            {editorial.introduction.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed md:text-lg">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Ficha resumida — apenas dados confirmados */}
          <motion.dl
            variants={fadeUp}
            className="mt-12 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3"
          >
            <Fact label="Posição" value={identity.position} />
            <Fact label="Idade" value={`${identity.age} anos`} />
            {/* Em 2 colunas são 3 células — a última estica para não sobrar buraco. */}
            <Fact label="Fase" value="Formação" className="col-span-2 sm:col-span-1" />
          </motion.dl>
        </motion.div>

        {/* Retrato */}
        <div ref={ref} className="lg:col-span-5">
          <motion.div
            variants={clipReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative overflow-hidden"
          >
            <motion.div style={animate ? { y: imageY } : undefined} className="scale-[1.08]">
              <MediaFrame
                slot={media.portrait}
                className="aspect-[3/4] w-full lg:aspect-[3/4.4]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </motion.div>
          </motion.div>

          <p className="kicker mt-4 text-ash">{editorial.introduction.portraitLabel}</p>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn('bg-ink px-5 py-6', className)}>
      <dt className="kicker text-ash">{label}</dt>
      <dd className="mt-3 font-display text-2xl leading-none md:text-3xl">{value}</dd>
    </div>
  );
}
