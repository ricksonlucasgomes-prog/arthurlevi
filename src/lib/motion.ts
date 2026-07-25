import type { Transition, Variants } from 'motion/react';

/**
 * Curvas de easing do projeto.
 * `out` é a curva base — desaceleração longa, sensação cinematográfica.
 * `inOut` é usada em transformações ligadas ao scroll.
 */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  soft: [0.25, 0.46, 0.45, 0.94],
} as const;

export const duration = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
  cinematic: 1.4,
} as const;

/** Viewport padrão: dispara uma única vez, um pouco antes de entrar na tela. */
export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const;

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 140,
  damping: 20,
  mass: 0.6,
};

/** Container que escalona a entrada dos filhos. */
export const stagger = (delayChildren = 0, staggerChildren = 0.07): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

/** Revelação por máscara: o texto sobe de dentro de um bloco com overflow. */
export const maskUp: Variants = {
  /*
   * 130%, e não 110%: `MaskLine` abre respiro vertical para os acentos da
   * caixa alta (Ú, Ó, Ç) não serem cortados pelo `overflow-hidden`. Esse
   * respiro é área visível, então o ponto de partida precisa ficar abaixo
   * dele — senão o texto aparece antes da hora.
   */
  hidden: { y: '130%' },
  visible: {
    y: '0%',
    transition: { duration: duration.slow, ease: ease.out },
  },
};

/** Entrada padrão de blocos de conteúdo. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
};

/** Linha que se desenha da esquerda para a direita. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.cinematic, ease: ease.out },
  },
};

/** Imagem revelada por clipping vertical, com leve contra-movimento interno. */
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: duration.cinematic, ease: ease.out },
  },
};
