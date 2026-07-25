'use client';

import { useReducedMotion } from 'motion/react';
import { usePointerFine } from './use-media-query';

/**
 * Política de movimento do site.
 *
 * - `animate`: animações narrativas (reveal, parallax de scroll, contadores).
 *   Desligadas quando o usuário pede `prefers-reduced-motion: reduce`.
 * - `interact`: efeitos ligados ao ponteiro (cursor customizado, magnetismo,
 *   parallax de mouse). Exigem ponteiro preciso — nunca rodam no toque.
 */
export function useMotionOK() {
  const reduced = useReducedMotion();
  const fine = usePointerFine();

  return {
    animate: !reduced,
    interact: !reduced && fine,
  };
}
