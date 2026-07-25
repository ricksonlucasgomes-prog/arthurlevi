'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMotionOK } from '@/hooks/use-motion-ok';

/**
 * Anel que acompanha o cursor com um leve atraso e reage a elementos
 * interativos (`data-cursor`). O cursor nativo é mantido: esconder o ponteiro
 * do sistema prejudica usabilidade e não acrescenta nada aqui.
 *
 * Só monta em ponteiro preciso e com movimento permitido.
 */
export default function Cursor() {
  const { interact } = useMotionOK();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.5 });

  useEffect(() => {
    if (!interact) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      setActive(Boolean(target?.closest('a, button, [data-cursor]')));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [interact, x, y]);

  if (!interact) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-difference"
      style={{ x: ringX, y: ringY }}
    >
      <motion.span
        className="block -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone"
        animate={{
          width: active ? 46 : 22,
          height: active ? 46 : 22,
          opacity: visible ? (active ? 1 : 0.55) : 0,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      />
    </motion.div>
  );
}
