'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { springSoft } from '@/lib/motion';
import { useMotionOK } from '@/hooks/use-motion-ok';

/**
 * Atração magnética muito sutil: o elemento acompanha o cursor dentro de um
 * raio curto e volta com mola ao sair. Só existe em ponteiro preciso — no
 * toque o efeito é invisível e custaria bateria.
 */
export function Magnetic({
  children,
  className,
  strength = 0.22,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springSoft);
  const springY = useSpring(y, springSoft);
  const { interact } = useMotionOK();

  const handleMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!interact || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={interact ? { x: springX, y: springY } : undefined}
      className={className}
    >
      {children}
    </motion.span>
  );
}
