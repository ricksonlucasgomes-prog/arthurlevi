'use client';

import { motion } from 'motion/react';
import {
  bio,
  editorial,
  identity,
  physical,
  sectionIndex,
  type Pending,
} from '@/data/player';
import { fadeUp, stagger, tiltIn, viewportOnce } from '@/lib/motion';
import { Section, PendingValue } from '@/components/ui/section';
import { MediaFrame } from '@/components/ui/media-frame';
import { Tilt } from '@/components/ui/tilt';

/**
 * Ficha técnica. Campos sem informação real ficam explicitamente vazios —
 * um olheiro precisa distinguir "não informado" de "zero".
 */
export function PlayerProfile() {
  const confirmed: { label: string; value: string }[] = [
    { label: 'Nome', value: identity.fullName },
    { label: 'Idade', value: `${identity.age} anos` },
    { label: 'Posição', value: identity.position },
  ];

  const details: { label: string; value: Pending<string> }[] = [
    { label: 'Pé dominante', value: physical.dominantFoot },
    { label: 'Altura', value: physical.height },
    { label: 'Peso', value: physical.weight },
    { label: 'Clube atual', value: bio.club },
    { label: 'Categoria', value: bio.category },
  ];

  const hasShirtNumber = bio.shirtNumber !== null;
  const hasClub = bio.club !== null || bio.clubCrest.src !== null;

  return (
    <Section
      id="perfil"
      index={sectionIndex.perfil}
      title="Perfil"
      lead={editorial.profile.lead}
      tone="carbon"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <motion.div
          variants={stagger(0, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-8"
        >
          {/* Dados essenciais confirmados — leitura imediata para quem avalia. */}
          <motion.dl
            variants={tiltIn}
            className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3"
          >
            {confirmed.map((row, index) => (
              <div
                key={row.label}
                className={`bg-ink px-5 py-6 md:px-6 md:py-8 ${
                  index === 0 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <dt className="kicker text-ash">{row.label}</dt>
                <dd className="mt-3 font-display text-2xl leading-none md:text-3xl">
                  {row.value}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Demais campos permanecem visíveis, mas compactos e inequívocos. */}
          <motion.dl
            variants={tiltIn}
            className="mt-6 grid grid-cols-2 border-l border-t border-line"
          >
            {details.map((row, index) => (
              <div
                key={row.label}
                className={`min-h-28 border-b border-r border-line px-4 py-5 sm:min-h-32 sm:px-6 sm:py-6 ${
                  details.length % 2 !== 0 && index === details.length - 1 ? 'col-span-2' : ''
                }`}
              >
                <dt className="kicker text-ash">{row.label}</dt>
                <dd className="mt-4 font-display text-xl leading-none sm:text-2xl">
                  {row.value ?? <PendingValue compact />}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Informações de clube entram automaticamente quando forem confirmadas. */}
        <motion.div
          variants={stagger(0.1, 0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col lg:col-span-4"
        >
          {hasShirtNumber ? (
            <motion.div variants={tiltIn}>
              <Tilt className="border border-line">
                <p className="kicker border-b border-line px-5 py-4 text-ash">Número da camisa</p>
                <div className="flex aspect-[2/1] items-center justify-center lg:aspect-square">
                  <span className="font-display text-[clamp(5rem,16vw,10rem)] leading-none">
                    {bio.shirtNumber}
                  </span>
                </div>
              </Tilt>
            </motion.div>
          ) : null}

          {hasClub ? (
            <motion.div variants={tiltIn} className={hasShirtNumber ? 'mt-6' : ''}>
              <Tilt className="border border-line">
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
              </Tilt>
            </motion.div>
          ) : null}

          {!hasShirtNumber && !hasClub ? (
            <motion.div variants={tiltIn} className="flex flex-1">
              <Tilt className="hatch flex min-h-64 flex-1 flex-col justify-end border border-line p-6 md:p-8 lg:min-h-0">
                <p className="kicker text-accent">Aguardando confirmação</p>
                <h3 className="mt-5 font-display text-3xl leading-none">
                  {editorial.profile.pendingTitle}
                </h3>
                <p className="text-support mt-5 max-w-[34ch] text-ash">
                  {editorial.profile.pendingBody}
                </p>
              </Tilt>
            </motion.div>
          ) : null}

          <motion.p
            variants={fadeUp}
            className="mt-6 border-l border-accent pl-4 text-xs leading-relaxed text-ash"
          >
            {editorial.profile.privacy}
          </motion.p>
        </motion.div>
      </div>
    </Section>
  );
}
