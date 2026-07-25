import { player } from '@/data/player';
import { SiteSections } from '@/components/site-sections';

export default function Home() {
  return <SiteSections player={player} />;
}
