'use client';

import { motion } from 'motion/react';
import { achievements, display } from '@/data/player';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { Section, PendingBlock } from '@/components/ui/section';

const kindLabel: Record<string, string> = {
  titulo: 'Título',
  individual: 'Prêmio individual',
  artilharia: 'Artilharia',
  convocacao: 'Convocação',
};

/**
 * Conquistas.
 *
 * Conforme o briefing, a seção só existe na página pública quando houver
 * conquista real. Enquanto `display.showPendingSections` estiver ligado, ela
 * aparece em modo preparado para revisão do layout.
 */
export function Achievements() {
  if (achievements.length === 0 && !display.showPendingSections) return null;

  return (
    <Section
      id="conquistas"
      index="09"
      title="Conquistas"
      lead="Títulos, artilharias, prêmios individuais e convocações."
    >
      {achievements.length === 0 ? (
        <PendingBlock
          title="Nenhuma conquista publicada ainda"
          description="Assim que houver título, artilharia, prêmio ou convocação, envie o ano, a competição e o detalhe. Enquanto não houver, esta seção desaparece do site publicado."
        />
      ) : (
        <motion.ul
          variants={stagger(0, 0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="border-t border-line"
        >
          {achievements.map((item) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
              className="grid grid-cols-1 items-baseline gap-3 border-b border-line py-7 md:grid-cols-[7rem_1fr_minmax(0,20rem)] md:gap-8 md:py-9"
            >
              <span className="font-display text-3xl leading-none text-accent md:text-4xl">
                {item.year}
              </span>

              <div>
                <h3 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[0.95]">
                  {item.title}
                </h3>
                <p className="kicker mt-3 text-ash">{kindLabel[item.kind] ?? item.kind}</p>
              </div>

              <div className="text-sm leading-relaxed text-ash">
                {item.competition ? <p className="text-bone/80">{item.competition}</p> : null}
                {item.detail ? <p className="mt-2">{item.detail}</p> : null}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </Section>
  );
}
