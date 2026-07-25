'use client';

import { ReactLenis } from 'lenis/react';
import { useMotionOK } from '@/hooks/use-motion-ok';

/**
 * Suaviza a roda do mouse e o trackpad sem substituir a rolagem nativa.
 *
 * `interact` exige ponteiro preciso e respeita `prefers-reduced-motion`.
 * Assim, toque, teclado e usuários que pedem menos movimento continuam com o
 * comportamento padrão do navegador.
 */
export function SmoothScroll() {
  const { interact } = useMotionOK();

  if (!interact) return null;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      }}
    />
  );
}
