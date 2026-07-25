'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Media query reativa e segura para SSR.
 *
 * Usa `useSyncExternalStore` porque `matchMedia` é exatamente isso: um estado
 * externo ao React. No servidor e durante a hidratação o valor é `false`, o
 * que garante que o HTML inicial seja sempre a versão mais leve (sem cursor
 * customizado, sem parallax de ponteiro).
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onStoreChange);
      return () => list.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * `true` apenas em dispositivos com ponteiro preciso (mouse/trackpad).
 * Usado para ativar cursor customizado, parallax de mouse e efeitos magnéticos
 * — que não fazem sentido, e custam bateria, no toque.
 */
export function usePointerFine() {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

/** `true` a partir do breakpoint `lg` do Tailwind (1024px). */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}
