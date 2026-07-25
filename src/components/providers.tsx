'use client';

import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { MotionConfig } from 'motion/react';
import { ease } from '@/lib/motion';

/**
 * O cursor customizado só existe no cliente e não deve entrar no HTML
 * inicial — carregá-lo separadamente mantém o bundle crítico menor.
 */
const Cursor = dynamic(() => import('@/components/ui/cursor'), { ssr: false });

export function Providers({ children }: { children: ReactNode }) {
  return (
    // `reducedMotion="user"` faz o Motion desligar transformações sozinho
    // quando o sistema do usuário pede menos movimento.
    <MotionConfig reducedMotion="user" transition={{ ease: [...ease.out] }}>
      {children}
      <Cursor />
    </MotionConfig>
  );
}
