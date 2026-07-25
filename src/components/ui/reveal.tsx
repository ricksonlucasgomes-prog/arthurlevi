'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { fadeUp, maskUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso antes do primeiro filho entrar. */
  delay?: number;
  /** Intervalo entre os filhos. */
  gap?: number;
}

/**
 * Container que dispara a entrada dos filhos ao entrar na viewport.
 * Os filhos animam através das variantes `fadeUp` / `maskUp`.
 */
export function Reveal({ children, className, delay = 0, gap = 0.07 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={stagger(delay, gap)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

/** Bloco de conteúdo que sobe e aparece. Use dentro de `<Reveal>`. */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Linha de texto revelada por máscara — o texto desliza de dentro de um
 * bloco com overflow oculto. É o gesto tipográfico principal do site.
 * Use dentro de `<Reveal>`.
 */
export function MaskLine({
  children,
  className,
  lineClassName,
}: {
  children: ReactNode;
  className?: string;
  lineClassName?: string;
}) {
  return (
    <span className={cn('block overflow-hidden', className)}>
      <motion.span variants={maskUp} className={cn('block will-change-transform', lineClassName)}>
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Revela um parágrafo palavra por palavra. Reservado para frases curtas de
 * destaque — em texto longo o efeito vira ruído e prejudica a leitura.
 */
export function MaskWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={maskUp} className="inline-block will-change-transform">
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
