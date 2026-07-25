'use client';

import { motion } from 'motion/react';
import { ease } from '@/lib/motion';

/**
 * Indicador de scroll: um traço que percorre uma linha vertical.
 * Discreto o bastante para não competir com a tipografia da hero.
 */
export function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.9 }}
      className="pointer-events-none absolute inset-x-0 bottom-6 z-30 md:bottom-8"
    >
      <div className="shell flex items-center gap-4">
        <span className="kicker text-ash">Role</span>

        <span aria-hidden className="relative h-px w-24 overflow-hidden bg-line-strong sm:w-36">
          <motion.span
            className="absolute inset-y-0 left-0 w-1/3 bg-accent"
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 2.4, ease: ease.inOut, repeat: Infinity, repeatDelay: 0.4 }}
          />
        </span>
      </div>
    </motion.div>
  );
}
