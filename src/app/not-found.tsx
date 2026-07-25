import Link from 'next/link';
import type { Metadata } from 'next';
import { identity } from '@/data/player';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center">
      <div className="shell">
        <p className="kicker text-accent">Erro 404</p>
        <h1 className="mt-6 font-display text-[clamp(3rem,14vw,11rem)] leading-[0.82]">
          Fora
          <br />
          de campo
        </h1>
        <p className="mt-8 max-w-[46ch] text-ash">
          A página que você procurou não existe. Volte para o perfil de {identity.fullName}.
        </p>
        <Link
          href="/"
          className="kicker mt-10 inline-flex bg-accent px-7 py-4 text-ink transition-colors duration-500 hover:bg-bone"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
