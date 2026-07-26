'use client';

import { motion } from 'motion/react';
import { currentSeason, sectionIndex, statistics, type SeasonStats } from '@/data/player';
import { fadeUp, stagger, tiltIn, viewportOnce } from '@/lib/motion';
import { Section, PendingValue } from '@/components/ui/section';
import { Counter } from '@/components/ui/counter';

/** Soma apenas os valores informados. Se nenhum existir, o total é `null`. */
function total(key: 'matches' | 'goals' | 'assists' | 'minutes') {
  const values = statistics.map((season) => season[key]).filter((v): v is number => v !== null);
  return values.length > 0 ? values.reduce((sum, v) => sum + v, 0) : null;
}

function competitionCount() {
  const names = new Set(
    statistics.map((season) => season.competition).filter((c): c is string => c !== null),
  );
  return names.size > 0 ? names.size : null;
}

/**
 * Números do atleta.
 *
 * Um total ausente nunca vira zero: zero é um dado, ausência é outra coisa.
 * Para atualizar, adicione temporadas em `player.statistics`.
 */
export function Statistics() {
  const primary = [
    { label: 'Jogos', value: total('matches') },
    { label: 'Gols', value: total('goals') },
    { label: 'Assistências', value: total('assists') },
    { label: 'Minutos', value: total('minutes') },
  ];

  const secondary = [
    { label: 'Competições', value: competitionCount(), display: null as string | null },
    { label: 'Temporada', value: null, display: currentSeason },
  ];

  const hasAny = primary.some((item) => item.value !== null) || statistics.length > 0;

  return (
    <Section
      id="numeros"
      index={sectionIndex.numeros}
      title="Números"
      lead="Registro objetivo de temporada. Os valores são somados automaticamente a partir das temporadas cadastradas."
    >
      <motion.div
        variants={stagger(0, 0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4"
      >
        {primary.map((item) => (
          <motion.div key={item.label} variants={tiltIn} className="bg-ink px-5 py-8 md:px-7 md:py-12">
            <p className="kicker text-ash">{item.label}</p>
            <p className="mt-6 font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.85]">
              {item.value !== null ? <Counter value={item.value} /> : <PendingValue compact />}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={stagger(0.1, 0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-px grid grid-cols-1 gap-px border-x border-b border-line bg-line sm:grid-cols-2"
      >
        {secondary.map((item) => (
          <motion.div key={item.label} variants={fadeUp} className="bg-ink px-5 py-6 md:px-7">
            <p className="kicker text-ash">{item.label}</p>
            <p className="mt-3 font-display text-3xl leading-none">
              {item.display ?? (item.value !== null ? item.value : <PendingValue compact />)}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {statistics.length > 0 ? <SeasonTable seasons={statistics} /> : null}

      {!hasAny ? (
        <p className="mt-10 max-w-[68ch] text-sm leading-relaxed text-ash">
          Para ativar esta seção, adicione uma temporada em{' '}
          <code className="font-mono text-xs text-bone">player.statistics</code> com jogos, gols,
          assistências, minutos e competição. Os totais acima são calculados sozinhos.
        </p>
      ) : null}
    </Section>
  );
}

function SeasonTable({ seasons }: { seasons: SeasonStats[] }) {
  return (
    <div className="mt-12 overflow-x-auto">
      <table className="w-full min-w-[42rem] border-collapse text-left">
        <caption className="sr-only">Estatísticas por temporada</caption>
        <thead>
          <tr className="border-b border-line-strong">
            {['Temporada', 'Competição', 'Jogos', 'Gols', 'Assist.', 'Minutos'].map((head) => (
              <th key={head} scope="col" className="kicker py-4 pr-6 font-normal text-ash">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {seasons.map((season) => (
            <tr key={season.id} className="border-b border-line">
              <td className="py-5 pr-6 font-display text-xl">{season.season}</td>
              <td className="py-5 pr-6 text-sm text-ash">{season.competition ?? '—'}</td>
              <td className="py-5 pr-6 font-display text-xl">{season.matches ?? '—'}</td>
              <td className="py-5 pr-6 font-display text-xl text-accent">{season.goals ?? '—'}</td>
              <td className="py-5 pr-6 font-display text-xl">{season.assists ?? '—'}</td>
              <td className="py-5 pr-6 font-display text-xl">{season.minutes ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
