'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { duration as dur, ease } from '@/lib/motion';

/**
 * Número que conta até o valor real ao entrar na tela.
 * Com `prefers-reduced-motion`, o valor final aparece direto.
 */
export function Counter({
  value,
  className,
  duration = dur.cinematic,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Com movimento reduzido a animação dura zero: o valor final chega no
    // primeiro quadro, sem contagem, e sem setState síncrono dentro do efeito.
    const controls = animate(0, value, {
      duration: reduced ? 0 : duration,
      ease: [...ease.out],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat('pt-BR').format(display)}
    </span>
  );
}
