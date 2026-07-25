import type { Metadata } from 'next';
import Link from 'next/link';
import {
  achievements,
  attributes,
  bio,
  career,
  developerContact,
  gallery,
  guardianContact,
  highlights,
  media,
  physical,
  social,
  statistics,
  traits,
  type MediaSlot,
} from '@/data/player';

export const metadata: Metadata = {
  title: 'Pendências do site',
  robots: { index: false, follow: false },
};

/**
 * Página de uso interno da família: lista tudo que ainda falta para o site
 * ficar completo. Não é indexada e não aparece na navegação.
 */
export default function PendenciasPage() {
  const mediaSlots: MediaSlot[] = [
    media.heroBackground,
    media.heroCutout,
    media.portrait,
    media.onPitch,
    media.scouting,
    bio.clubCrest,
    ...gallery,
    ...highlights.map((h) => h.poster),
  ];

  const missingMedia = mediaSlots.filter((slot) => slot.src === null);

  const dataFields = [
    { label: 'Pé dominante', value: physical.dominantFoot },
    { label: 'Altura', value: physical.height },
    { label: 'Peso', value: physical.weight },
    { label: 'Clube atual', value: bio.club },
    { label: 'Categoria', value: bio.category },
    { label: 'Número da camisa', value: bio.shirtNumber },
    { label: 'Responsável — nome', value: guardianContact.name },
    { label: 'Responsável — WhatsApp', value: guardianContact.whatsapp },
    { label: 'Responsável — e-mail', value: guardianContact.email },
    { label: 'Desenvolvedor — e-mail', value: developerContact.email },
    { label: 'Instagram do atleta', value: social.instagram },
  ];

  const missingFields = dataFields.filter((field) => field.value === null);

  const collections = [
    { label: 'Vídeos de highlights', count: highlights.filter((h) => h.ref !== null).length },
    { label: 'Atributos avaliados', count: attributes.filter((a) => a.value !== null).length },
    { label: 'Características descritas', count: traits.filter((t) => t.body !== null).length },
    { label: 'Temporadas com estatística', count: statistics.length },
    { label: 'Registros de trajetória', count: career.length },
    { label: 'Conquistas', count: achievements.length },
  ];

  return (
    <main className="shell py-28 md:py-36">
      <p className="kicker text-accent">Uso interno</p>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,9vw,6rem)] leading-[0.86]">
        O que falta
      </h1>
      <p className="mt-6 max-w-[60ch] text-ash">
        Esta página não é indexada e não aparece no menu. Ela lê{' '}
        <code className="font-mono text-xs text-bone">src/data/player.ts</code> e mostra tudo que
        ainda está pendente. Conforme você preenche os dados e envia os arquivos, os itens somem
        daqui sozinhos.
      </p>

      {/* Mídia */}
      <section className="mt-16">
        <h2 className="font-display text-3xl">
          Arquivos de mídia{' '}
          <span className="text-accent">{missingMedia.length}</span>
        </h2>

        {missingMedia.length === 0 ? (
          <p className="mt-6 text-ash">Todos os arquivos de mídia foram enviados.</p>
        ) : (
          <ul className="mt-8 border-t border-line">
            {missingMedia.map((slot) => (
              <li key={slot.expectedPath} className="border-b border-line py-6">
                <p className="font-mono text-sm break-all text-bone">
                  public{slot.expectedPath}
                </p>
                <p className="mt-2 text-sm text-ash">{slot.brief}</p>
                <p className="kicker mt-2 text-[0.6rem] text-ash/70">{slot.spec}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Campos de texto */}
      <section className="mt-16">
        <h2 className="font-display text-3xl">
          Informações <span className="text-accent">{missingFields.length}</span>
        </h2>

        {missingFields.length === 0 ? (
          <p className="mt-6 text-ash">Todos os campos foram preenchidos.</p>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {missingFields.map((field) => (
              <li key={field.label} className="bg-ink px-5 py-4 text-sm">
                {field.label}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Coleções */}
      <section className="mt-16">
        <h2 className="font-display text-3xl">Conteúdo cadastrado</h2>
        <ul className="mt-8 border-t border-line">
          {collections.map((item) => (
            <li
              key={item.label}
              className="flex items-baseline justify-between gap-6 border-b border-line py-5"
            >
              <span className="text-sm">{item.label}</span>
              <span
                className={`font-display text-2xl ${item.count === 0 ? 'text-ash/50' : 'text-accent'}`}
              >
                {item.count}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Link href="/" className="kicker underline-grow mt-16 inline-flex text-bone">
        Voltar ao site
      </Link>
    </main>
  );
}
