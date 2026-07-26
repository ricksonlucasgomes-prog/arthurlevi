'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { useMotionOK } from '@/hooks/use-motion-ok';
import { cn } from '@/lib/utils';

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Ângulo máximo em graus. Manter curto: profundidade, não vitrine giratória. */
  maxTilt?: number;
  /** Brilho especular que acompanha o ponteiro — sugere uma superfície de aço. */
  sheen?: boolean;
}

/**
 * Plano 3D que inclina alguns graus na direção do ponteiro e volta com mola.
 *
 * É o gesto de profundidade do site: a página se comporta como cartelas de
 * material apoiadas em uma mesa, não como um carrossel de vitrine. Por isso o
 * ângulo padrão é baixo e o efeito só existe em ponteiro preciso (`interact`)
 * — no toque ele seria invisível e custaria bateria.
 */
export function Tilt({ children, className, maxTilt = 3.5, sheen = true }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { interact } = useMotionOK();

  // Posição do ponteiro relativa ao centro do plano, em [-0.5, 0.5].
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  // Presença do ponteiro sobre o plano — controla a opacidade do brilho.
  const presence = useMotionValue(0);

  const springX = useSpring(px, { stiffness: 120, damping: 18, mass: 0.4 });
  const springY = useSpring(py, { stiffness: 120, damping: 18, mass: 0.4 });
  const glow = useSpring(presence, { stiffness: 90, damping: 22, mass: 0.6 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // O brilho é uma luz fria e larga, quase subliminar — nunca um "glare" duro.
  const sheenX = useTransform(springX, [-0.5, 0.5], [22, 78]);
  const sheenY = useTransform(springY, [-0.5, 0.5], [15, 85]);
  const sheenBg = useMotionTemplate`radial-gradient(130% 90% at ${sheenX}% ${sheenY}%, rgb(237 242 247 / 0.07), transparent 58%)`;

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interact || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
    presence.set(1);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
    presence.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={
        interact ? { rotateX, rotateY, transformPerspective: 1000 } : undefined
      }
      className={cn('relative', className)}
    >
      {children}
      {interact && sheen ? (
        <motion.span
          aria-hidden
          style={{ background: sheenBg, opacity: glow }}
          className="pointer-events-none absolute inset-0 z-10 mix-blend-screen"
        />
      ) : null}
    </motion.div>
  );
}
