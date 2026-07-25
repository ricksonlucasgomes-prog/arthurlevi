'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { career, sectionIndex } from '@/data/player';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { Section, PendingBlock } from '@/components/ui/section';

const kindLabel: Record<string, string> = {
  clube: 'Clube',
  competicao: 'Competição',
  avaliacao: 'Avaliação',
  conquista: 'Conquista',
  formacao: 'Formação',
};

/**
 * Linha do tempo esportiva. A linha vertical é desenhada conforme o scroll
 * avança — o gesto reforça a ideia de progressão.
 */
export function CareerTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const hasCareer = career.length > 0;
  const { scrollYProgress } = useScroll({
    // Sem registros, o `<ol>` não é renderizado e o ref nunca recebe elemento —
    // apontar `target` para ele faria o Motion falhar ao medir o alvo.
    target: hasCareer ? ref : undefined,
    offset: ['start 75%', 'end 60%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <Section
      id="trajetoria"
      index={sectionIndex.trajetoria}
      title="Trajetória"
      lead="Equipes, categorias, competições e avaliações registradas em ordem cronológica."
      tone="carbon"
    >
      {career.length === 0 ? (
        <PendingBlock
          title="A trajetória será registrada aqui"
          description="Envie as equipes por que passou, os anos, as categorias e as competições disputadas. Cada registro entra na linha do tempo com período, clube e descrição."
        />
      ) : (
        <div className="relative">
          <ol ref={ref} className="relative pl-8 md:pl-14">
            {/* Trilho */}
            <span aria-hidden className="absolute left-0 top-2 h-full w-px bg-line md:left-2" />
            <motion.span
              aria-hidden
              style={{ scaleY: progress }}
              className="absolute left-0 top-2 h-full w-px origin-top bg-accent md:left-2"
            />

            {career.map((entry) => (
              <motion.li
                key={entry.id}
                variants={stagger(0, 0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="relative pb-12 last:pb-0 md:pb-16"
              >
                <span
                  aria-hidden
                  className="absolute -left-8 top-2 size-2 rounded-full bg-accent md:-left-[3.4rem] md:size-2.5"
                />

                <motion.p variants={fadeUp} className="kicker flex items-center gap-4 text-accent">
                  {entry.period}
                  <span className="text-ash">{kindLabel[entry.kind] ?? entry.kind}</span>
                </motion.p>

                <motion.h3
                  variants={fadeUp}
                  className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] leading-[0.95]"
                >
                  {entry.title}
                </motion.h3>

                {entry.club || entry.category ? (
                  <motion.p variants={fadeUp} className="mt-3 text-sm text-bone/80">
                    {[entry.club, entry.category].filter(Boolean).join(' · ')}
                  </motion.p>
                ) : null}

                {entry.description ? (
                  <motion.p
                    variants={fadeUp}
                    className="mt-4 max-w-[60ch] text-sm leading-relaxed text-ash md:text-base"
                  >
                    {entry.description}
                  </motion.p>
                ) : null}
              </motion.li>
            ))}
          </ol>
        </div>
      )}
    </Section>
  );
}
