'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { media } from '@/data/player';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { useMotionOK } from '@/hooks/use-motion-ok';
import { MediaFrame } from '@/components/ui/media-frame';
import { MaskLine } from '@/components/ui/reveal';
import { Action } from '@/components/ui/action';

/**
 * Chamada para olheiros, clubes e avaliadores.
 * Faixa full-bleed com parallax leve — é o clímax visual antes do contato.
 */
export function ScoutingCTA() {
  const ref = useRef<HTMLElement>(null);
  const { animate } = useMotionOK();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section ref={ref} aria-labelledby="scouting-title" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div style={animate ? { y: imageY } : undefined} className="h-[124%] w-full">
          <MediaFrame
            slot={media.scouting}
            className="h-full w-full"
            sizes="100vw"
            compact
          />
        </motion.div>
        {/* Duotone vermelho sobre a foto — mesma assinatura cromática do sobrenome na hero. */}
        <div aria-hidden className="absolute inset-0 bg-accent/60 mix-blend-color" />
        <div aria-hidden className="absolute inset-0 bg-ink/80" />
      </div>

      <motion.div
        variants={stagger(0, 0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="shell relative py-24 md:py-32 lg:py-40"
      >
        <motion.p variants={fadeUp} className="kicker mb-8 text-accent">
          Para profissionais do futebol
        </motion.p>

        <h2
          id="scouting-title"
          className="max-w-[18ch] font-display text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.88]"
        >
          <MaskLine>Interessado em</MaskLine>
          <MaskLine>conhecer melhor</MaskLine>
          <MaskLine>o atleta?</MaskLine>
        </h2>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-[56ch] text-base leading-relaxed text-bone/80 md:text-lg"
        >
          Para informações esportivas, avaliações, oportunidades ou contato profissional, fale
          diretamente com o responsável.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <Action href="#contato">Entrar em contato</Action>
        </motion.div>
      </motion.div>
    </section>
  );
}
