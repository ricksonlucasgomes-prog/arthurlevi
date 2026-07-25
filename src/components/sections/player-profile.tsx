'use client';

import { motion } from 'motion/react';
import { bio, identity, physical, sectionIndex, type Pending } from '@/data/player';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { Section, PendingValue } from '@/components/ui/section';
import { MediaFrame } from '@/components/ui/media-frame';

/**
 * Ficha técnica. Campos sem informação real ficam explicitamente vazios —
 * um olheiro precisa distinguir "não informado" de "zero".
 */
export function PlayerProfile() {
  const location =
    bio.city && bio.state ? `${bio.city} — ${bio.state}` : (bio.city ?? bio.state ?? null);

  const rows: { label: string; value: Pending<string> }[] = [
    { label: 'Nome', value: identity.fullName },
    { label: 'Idade', value: `${identity.age} anos` },
    { label: 'Posição', value: identity.position },
    { label: 'Pé dominante', value: physical.dominantFoot },
    { label: 'Altura', value: physical.height },
    { label: 'Peso', value: physical.weight },
    { label: 'Cidade / Estado', value: location },
    { label: 'Clube atual', value: bio.club },
    { label: 'Categoria', value: bio.category },
  ];

  return (
    <Section
      id="perfil"
      index={sectionIndex.perfil}
      title="Perfil"
      lead="Ficha técnica do atleta. Os campos ainda vazios serão preenchidos com informações confirmadas pelo responsável."
      tone="carbon"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Tabela de dados */}
        <motion.dl
          variants={stagger(0, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-8"
        >
          {rows.map((row) => (
            <motion.div
              key={row.label}
              variants={fadeUp}
              /*
               * No celular a ficha vira tabela de duas colunas em vez de
               * empilhar rótulo sobre valor: são nove linhas, e empilhadas
               * elas ocupavam três telas de rolagem. Alinhado pela linha de
               * base, lê-se como ficha técnica — que é como um olheiro
               * escaneia esses dados.
               */
              className="grid grid-cols-[8rem_1fr] items-baseline gap-x-4 border-b border-line py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8 sm:py-6"
            >
              <dt className="kicker text-ash">{row.label}</dt>
              <dd className="font-display text-xl leading-none sm:text-2xl md:text-3xl">
                {row.value ?? <PendingValue />}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        {/* Camisa + escudo */}
        <motion.div
          variants={stagger(0.1, 0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-4"
        >
          <motion.div variants={fadeUp} className="border border-line">
            <p className="kicker border-b border-line px-5 py-4 text-ash">Número da camisa</p>
            {/*
             * O quadrado só existe no desktop, onde a coluna é estreita. No
             * celular a coluna é a tela inteira e um quadrado viraria ~350px
             * de hachura para exibir um traço.
             */}
            <div className="flex aspect-[2/1] items-center justify-center lg:aspect-square">
              {bio.shirtNumber !== null ? (
                <span className="font-display text-[clamp(5rem,16vw,10rem)] leading-none">
                  {bio.shirtNumber}
                </span>
              ) : (
                <span className="hatch flex h-full w-full items-center justify-center">
                  <span className="font-display text-[clamp(5rem,16vw,10rem)] leading-none text-ash/30">
                    —
                  </span>
                  <span className="sr-only">Número da camisa ainda não informado</span>
                </span>
              )}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 border border-line">
            <p className="kicker border-b border-line px-5 py-4 text-ash">Clube atual</p>
            <div className="flex items-center gap-5 p-5">
              <MediaFrame
                slot={bio.clubCrest}
                className="size-20 shrink-0"
                sizes="80px"
                compact
              />
              <p className="font-display text-xl leading-tight">
                {bio.club ?? <PendingValue compact />}
              </p>
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-xs leading-relaxed text-ash">
            Por proteção ao atleta, menor de idade, não são divulgados endereço, escola, rotina ou
            locais de treino.
          </motion.p>
        </motion.div>
      </div>
    </Section>
  );
}
