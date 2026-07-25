'use client';

import { motion } from 'motion/react';
import { identity } from '@/data/player';
import { duration, ease, viewportOnce } from '@/lib/motion';
import { useMotionOK } from '@/hooks/use-motion-ok';

/**
 * Campo esquemático com a zona de atuação do atacante destacada.
 * É o único dado tático exibido porque é o único confirmado: a posição.
 */
export function PitchDiagram() {
  const { animate } = useMotionOK();

  return (
    <figure className="border border-line p-5 md:p-8">
      <figcaption className="kicker mb-6 flex items-center justify-between text-ash">
        <span>Zona de atuação</span>
        <span className="text-accent">{identity.positionShort}</span>
      </figcaption>

      <svg
        viewBox="0 0 300 200"
        role="img"
        aria-label={`Campo de futebol com a zona de atuação do ${identity.position.toLowerCase()} destacada no terço final`}
        className="w-full"
      >
        {/* Zona de atuação */}
        <motion.rect
          x="200"
          y="40"
          width="99"
          height="120"
          className="fill-accent/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: duration.base, delay: 0.5 }}
        />

        {/* Linhas do campo */}
        <motion.g
          className="stroke-line-strong"
          fill="none"
          strokeWidth="1"
          initial={animate ? { pathLength: 0, opacity: 0 } : false}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: duration.cinematic, ease: ease.out }}
        >
          <rect x="1" y="1" width="298" height="198" />
          <line x1="150" y1="1" x2="150" y2="199" />
          <circle cx="150" cy="100" r="30" />
          <rect x="1" y="50" width="45" height="100" />
          <rect x="254" y="50" width="45" height="100" />
          <rect x="1" y="77" width="16" height="46" />
          <rect x="283" y="77" width="16" height="46" />
        </motion.g>

        {/* Marcador do atleta */}
        <motion.g
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: duration.base, delay: 0.75, ease: ease.out }}
          style={{ transformOrigin: '245px 100px' }}
        >
          {animate ? (
            <motion.circle
              cx="245"
              cy="100"
              r="6"
              className="fill-accent/40"
              animate={{ r: [6, 16], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          ) : null}
          <circle cx="245" cy="100" r="5" className="fill-accent" />
        </motion.g>
      </svg>
    </figure>
  );
}
