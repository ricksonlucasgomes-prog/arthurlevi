'use client';

import { motion } from 'motion/react';
import { media, traits } from '@/data/player';
import { clipReveal, fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { Section } from '@/components/ui/section';
import { MediaFrame } from '@/components/ui/media-frame';
import { PitchDiagram } from './pitch-diagram';

/**
 * "Em campo" — características de jogo.
 *
 * Nenhum texto descritivo é gerado automaticamente: cada bloco espera a
 * descrição confirmada pelo treinador ou responsável. Afirmar qualidade
 * técnica sem base seria enganar quem avalia.
 */
export function OnPitch() {
  const described = traits.filter((trait) => trait.body !== null);

  return (
    <Section
      id="em-campo"
      index="04"
      title="Em campo"
      lead="Como Arthur joga. Cada característica será descrita a partir da observação de quem acompanha o atleta."
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <PitchDiagram />

          <motion.div
            variants={clipReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-6"
          >
            <MediaFrame
              slot={media.onPitch}
              className="aspect-[16/10] w-full"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </motion.div>
        </div>

        <motion.ul
          variants={stagger(0.05, 0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-7"
        >
          {traits.map((trait, index) => (
            <motion.li
              key={trait.key}
              variants={fadeUp}
              className="border-b border-line py-6 first:border-t md:py-7"
            >
              <div className="flex items-baseline gap-4">
                <span className="kicker text-ash/60">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-2xl leading-none md:text-3xl">{trait.label}</h3>
              </div>

              {trait.body ? (
                <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-ash md:text-base">
                  {trait.body}
                </p>
              ) : (
                <p className="kicker mt-4 text-ash/60">
                  aguardando descrição
                  <span className="sr-only"> — característica ainda não descrita</span>
                </p>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {described.length === 0 ? (
        <p className="mt-10 max-w-[62ch] text-sm leading-relaxed text-ash">
          Para ativar esta seção, envie de duas a quatro frases por característica, descrevendo o
          que o atleta faz em campo. Descrições curtas e concretas funcionam melhor do que adjetivos.
        </p>
      ) : null}
    </Section>
  );
}
