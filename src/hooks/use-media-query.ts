'use client';

import { useEffect, useState } from 'react';

/**
 * Media query reativa e segura para SSR (retorna `false` no servidor e no
 * primeiro paint, evitando divergência de hidratação).
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
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
