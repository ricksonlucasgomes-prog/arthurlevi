'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { navigation } from '@/data/site';
import { identity, sectionIndex, sectionVisibility } from '@/data/player';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

const visibleNavigation = navigation.filter((item) => {
  if (item.id === 'em-campo') return sectionVisibility.onPitch;
  if (item.id === 'highlights') return sectionVisibility.highlights;
  if (item.id === 'numeros') return sectionVisibility.statistics;
  if (item.id === 'trajetoria') return sectionVisibility.career;
  if (item.id === 'galeria') return sectionVisibility.gallery;
  return true;
});

export function Navigation() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, 'change', (latest) => setCondensed(latest > 80));

  // Marca a seção visível para destacar o link correspondente.
  useEffect(() => {
    const sections = visibleNavigation
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Trava o scroll do corpo enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <>
      <a
        href="#conteudo"
        className="kicker sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-accent focus:px-5 focus:py-3 focus:text-ink"
      >
        Pular para o conteúdo
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
          condensed && !open
            ? 'border-b border-line bg-ink/80 backdrop-blur-md'
            : 'border-b border-transparent',
        )}
      >
        <nav aria-label="Navegação principal" className="shell flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="font-display text-lg leading-none tracking-[-0.01em] md:text-xl"
            aria-label={`${identity.fullName} — início`}
          >
            {identity.firstName}
            <span className="text-accent"> {identity.lastName}</span>
          </Link>

          {/* Desktop */}
          <ul className="hidden items-center gap-8 lg:flex">
            {visibleNavigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={cn(
                    'kicker underline-grow py-2 transition-colors duration-300',
                    active === item.id ? 'text-accent' : 'text-ash hover:text-bone',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="flex items-center gap-3 lg:hidden"
          >
            <span className="kicker text-ash">{open ? 'Fechar' : 'Menu'}</span>
            <span aria-hidden className="relative block h-3 w-6">
              <span
                className={cn(
                  'absolute left-0 block h-px w-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  open ? 'top-1.5 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 block h-px w-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  open ? 'top-1.5 -rotate-45' : 'top-3',
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      <MobileMenu open={open} active={active} onClose={close} />
    </>
  );
}

function MobileMenu({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: string | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.6, ease: ease.out }}
          className="fixed inset-0 z-40 flex flex-col justify-between bg-ink pb-10 pt-24 lg:hidden"
        >
          <ul className="shell flex flex-col">
            {visibleNavigation.map((item, index) => (
              <li key={item.id} className="overflow-hidden border-b border-line">
                <motion.a
                  href={`#${item.id}`}
                  onClick={onClose}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + index * 0.05, duration: 0.6, ease: ease.out }}
                  className={cn(
                    'flex items-baseline justify-between py-4 font-display text-[2.75rem] leading-none',
                    active === item.id ? 'text-accent' : 'text-bone',
                  )}
                >
                  {item.label}
                  {/* Mesmo índice do cabeçalho da seção — o menu é um sumário. */}
                  <span className="kicker text-ash">{sectionIndex[item.id]}</span>
                </motion.a>
              </li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="shell kicker text-ash"
          >
            {identity.position} — {identity.age} anos
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
