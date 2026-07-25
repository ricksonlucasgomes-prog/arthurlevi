'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * `false` no servidor e no primeiro render do cliente; `true` depois de montar.
 *
 * Serve para adiar a aplicação de `style` alimentada por `MotionValue` de
 * scroll. O Motion serializa uma transformação identidade como
 * `transform: "none"` no SSR, mas a omite no primeiro render do cliente — a
 * divergência derruba a hidratação e faz o React recriar a árvore inteira, o
 * que zera o `ref` que o `useScroll` precisa medir.
 *
 * Adiando para depois da montagem, servidor e cliente renderizam o mesmo HTML
 * (sem `style`) e o parallax entra em seguida. Como todos esses efeitos partem
 * de `scrollYProgress = 0`, não há diferença visual.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
