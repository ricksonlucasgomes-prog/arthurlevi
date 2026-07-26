'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { drawLine, fadeUp, stagger, tiltIn, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { MaskLine } from './reveal';

interface SectionProps {
  id: string;
  /** Índice narrativo exibido como "01", "02"… */
  index: string;
  /** Título gráfico da seção. Caixa alta é aplicada pelo display. */
  title: string;
  /** Texto curto de apoio, à direita do título no desktop. */
  lead?: string;
  children: ReactNode;
  className?: string;
  /** Fundo alternativo para criar ritmo entre seções. */
  tone?: 'ink' | 'carbon';
  /** Esconde o cabeçalho quando a seção tem composição própria. */
  bare?: boolean;
}

export function Section({
  id,
  index,
  title,
  lead,
  children,
  className,
  tone = 'ink',
  bare = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        'relative scroll-mt-20 py-20 md:py-28 lg:py-36',
        tone === 'carbon' && 'bg-carbon',
        className,
      )}
    >
      <div className="shell">
        {!bare ? <SectionHeader id={id} index={index} title={title} lead={lead} /> : null}
        {children}
      </div>
    </section>
  );
}

function SectionHeader({ id, index, title, lead }: Pick<SectionProps, 'id' | 'index' | 'title' | 'lead'>) {
  return (
    <motion.header
      variants={stagger(0, 0.09)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mb-12 md:mb-16 lg:mb-20"
    >
      {/* Barra técnica: índice — régua — contexto */}
      <div className="flex items-center gap-4 md:gap-6">
        <motion.span variants={fadeUp} className="kicker text-accent">
          {index}
        </motion.span>
        <motion.span
          variants={drawLine}
          className="h-px flex-1 origin-left bg-line-strong"
          aria-hidden
        />
        <motion.span variants={fadeUp} className="kicker hidden text-ash sm:block">
          Arthur Levi
        </motion.span>
      </div>

      <div className="mt-6 flex flex-col gap-6 md:mt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <h2
          id={`${id}-title`}
          className="font-display text-[clamp(2.75rem,10vw,7rem)] leading-[0.86]"
        >
          <MaskLine>{title}</MaskLine>
        </h2>

        {lead ? (
          <motion.p
            variants={fadeUp}
            className="text-support max-w-[42ch] text-balance text-ash lg:pb-3 lg:text-right"
          >
            {lead}
          </motion.p>
        ) : null}
      </div>
    </motion.header>
  );
}

/**
 * Estado de seção preparada porém sem dados reais.
 * Nunca preenchemos a lacuna com conteúdo inventado — mostramos que o espaço
 * existe e o que falta para ativá-lo.
 */
export function PendingBlock({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      variants={tiltIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="hatch border border-line px-6 py-14 text-center md:py-20"
    >
      <p className="kicker text-accent">Aguardando informação</p>
      <p className="mx-auto mt-5 max-w-[52ch] text-balance font-display text-2xl leading-tight md:text-3xl">
        {title}
      </p>
      <p className="text-support mx-auto mt-4 max-w-[56ch] text-balance text-ash">
        {description}
      </p>
    </motion.div>
  );
}

/** Marcador inline para um campo individual ainda sem dado. */
export function PendingValue({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-baseline gap-2 text-ash">
      <span aria-hidden className="font-display text-inherit">
        —
      </span>
      {!compact ? <span className="kicker text-[0.6rem] text-ash/60">aguardando</span> : null}
      <span className="sr-only">Informação ainda não disponível</span>
    </span>
  );
}

export { MaskLine };
