'use client';

import { motion } from 'motion/react';
import { attributes, sectionIndex } from '@/data/player';
import { duration, ease, stagger, tiltIn, viewportOnce } from '@/lib/motion';
import { Section } from '@/components/ui/section';
import { Counter } from '@/components/ui/counter';

/**
 * Perfil de scouting.
 *
 * A nota só aparece quando existir avaliação real E fonte identificada.
 * Nota sem origem não tem valor nenhum para quem avalia — por isso a barra
 * fica visivelmente vazia até lá, em vez de exibir um número inventado.
 */
export function PlayerAttributes() {
  const evaluated = attributes.filter((item) => item.value !== null);

  return (
    <Section
      id="atributos"
      index={sectionIndex.atributos}
      title="Atributos"
      lead="Estrutura pronta para receber avaliação técnica. Cada nota será publicada junto da fonte que a emitiu."
    >
      <motion.ul
        variants={stagger(0, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="border-t border-line"
      >
        {attributes.map((attribute, index) => (
          <motion.li
            key={attribute.key}
            variants={tiltIn}
            className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 border-b border-line py-6 md:grid-cols-[3rem_minmax(0,16rem)_1fr_5rem] md:gap-x-8 md:py-7"
          >
            <span className="kicker text-ash/60">{String(index + 1).padStart(2, '0')}</span>

            <h3 className="font-display text-2xl leading-none md:text-3xl">{attribute.label}</h3>

            {/* Trilho */}
            <div className="col-span-2 md:col-span-1">
              <div className="relative h-2 w-full overflow-hidden bg-graphite">
                {attribute.value !== null ? (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: attribute.value / 100 }}
                    viewport={viewportOnce}
                    transition={{ duration: duration.cinematic, ease: ease.out, delay: 0.1 }}
                    className="absolute inset-0 origin-left bg-accent"
                  />
                ) : (
                  <span className="hatch absolute inset-0" />
                )}
              </div>
              {attribute.source ? (
                <p className="kicker mt-2 text-[0.6rem] text-ash/70">Fonte: {attribute.source}</p>
              ) : null}
            </div>

            <div className="col-span-2 text-right md:col-span-1">
              {attribute.value !== null ? (
                <Counter value={attribute.value} className="font-display text-3xl leading-none" />
              ) : (
                <span className="kicker text-ash/60">
                  não avaliado
                  <span className="sr-only"> — atributo ainda sem avaliação registrada</span>
                </span>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>

      {evaluated.length === 0 ? (
        <p className="mt-8 max-w-[62ch] text-sm leading-relaxed text-ash">
          Para ativar esta seção, envie a avaliação técnica com o nome do treinador ou avaliador
          responsável e a data. As notas usam escala de 0 a 100.
        </p>
      ) : null}
    </Section>
  );
}
