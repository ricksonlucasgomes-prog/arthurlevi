import { Hero } from '@/components/hero/hero';
import { PlayerIntroduction } from '@/components/sections/player-introduction';
import { PlayerProfile } from '@/components/sections/player-profile';
import { PlayerAttributes } from '@/components/sections/player-attributes';
import { OnPitch } from '@/components/sections/on-pitch';
import { Highlights } from '@/components/sections/highlights';
import { Statistics } from '@/components/sections/statistics';
import { CareerTimeline } from '@/components/sections/career-timeline';
import { Gallery } from '@/components/sections/gallery';
import { Achievements } from '@/components/sections/achievements';
import { ScoutingCTA } from '@/components/sections/scouting-cta';
import { Contact } from '@/components/sections/contact';
import { CinematicBreak } from '@/components/sections/cinematic-break';
import { sectionVisibility } from '@/data/player';

/**
 * A ordem das seções é a narrativa: quem ele é → o que faz em campo →
 * a prova em vídeo e números → a trajetória → como falar com o responsável.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <main id="conteudo">
        <PlayerIntroduction />
        <PlayerProfile />
        <CinematicBreak />
        {sectionVisibility.attributes ? <PlayerAttributes /> : null}
        {sectionVisibility.onPitch ? <OnPitch /> : null}
        {sectionVisibility.highlights ? <Highlights /> : null}
        {sectionVisibility.statistics ? <Statistics /> : null}
        {sectionVisibility.career ? <CareerTimeline /> : null}
        {sectionVisibility.gallery ? <Gallery /> : null}
        {sectionVisibility.achievements ? <Achievements /> : null}
        {sectionVisibility.scouting ? <ScoutingCTA /> : null}
        <Contact />
      </main>
    </>
  );
}
