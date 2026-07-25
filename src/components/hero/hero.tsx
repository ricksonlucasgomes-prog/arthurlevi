'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { identity, media } from '@/data/player';
import { duration, ease } from '@/lib/motion';
import { useMotionOK } from '@/hooks/use-motion-ok';
import { MediaFrame } from '@/components/ui/media-frame';
import { Action, PlayGlyph } from '@/components/ui/action';
import { ScrollCue } from './scroll-cue';

/**
 * Hero em camadas: fundo → tipografia → recorte do atleta.
 * A profundidade vem da sobreposição entre a camada de recorte e o nome —
 * por isso `media.heroCutout` (PNG transparente) é o arquivo de maior impacto
 * de todo o site.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { animate, interact } = useMotionOK();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Transformação cinematográfica na saída da hero.
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '32%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const backdropY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  // Parallax de ponteiro — deslocamento de poucos pixels, só no desktop.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.7 });

  const backdropShiftX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const backdropShiftY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const cutoutShiftX = useTransform(smoothX, [-0.5, 0.5], [-26, 26]);
  const cutoutShiftY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);

  const handlePointer = (event: React.PointerEvent<HTMLElement>) => {
    if (!interact) return;
    pointerX.set(event.clientX / window.innerWidth - 0.5);
    pointerY.set(event.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      ref={ref}
      onPointerMove={handlePointer}
      aria-label={`${identity.fullName}, ${identity.position}`}
      className="relative min-h-svh w-full overflow-hidden"
    >
      {/* ---------- Camada 1: fundo fotográfico ---------- */}
      <motion.div
        style={animate ? { scale: backdropScale, y: backdropY } : undefined}
        className="absolute inset-0"
      >
        <motion.div
          style={interact ? { x: backdropShiftX, y: backdropShiftY } : undefined}
          className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[58%]"
        >
          <MediaFrame
            slot={media.heroBackground}
            className="h-full w-full"
            sizes="(min-width: 1024px) 58vw, 100vw"
            priority
          />
          {/* Máscara que funde a foto no preto e devolve legibilidade ao texto */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20 lg:bg-gradient-to-r lg:from-ink lg:via-ink/55 lg:to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* ---------- Camada 3: recorte do atleta (passa por cima do nome) ---------- */}
      {media.heroCutout.src ? (
        <motion.div
          style={interact ? { x: cutoutShiftX, y: cutoutShiftY } : undefined}
          className="pointer-events-none absolute bottom-0 right-0 z-20 h-[62%] w-[72%] sm:h-[70%] sm:w-[58%] lg:h-[92%] lg:w-[46%]"
        >
          <MediaFrame
            slot={media.heroCutout}
            className="h-full w-full [&_img]:object-contain [&_img]:object-bottom"
            sizes="(min-width: 1024px) 46vw, 72vw"
            priority
          />
        </motion.div>
      ) : (
        <CutoutMarker />
      )}

      {/* ---------- Camada 2 + 4: tipografia e informação ---------- */}
      <motion.div
        style={animate ? { y: contentY, opacity: contentOpacity } : undefined}
        className="relative z-10 flex min-h-svh flex-col justify-end pb-24 pt-28 sm:pb-28 lg:justify-center lg:pb-32"
      >
        <div className="shell">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: duration.base }}
            className="kicker mb-5 flex items-center gap-3 text-accent md:mb-7"
          >
            <span aria-hidden className="h-px w-8 bg-accent" />
            {identity.position}
          </motion.p>

          <h1 className="font-display leading-[0.8] tracking-[-0.025em]">
            <span className="sr-only">
              {identity.fullName} — {identity.position}, {identity.age} anos
            </span>
            <NameLine text={identity.firstName} delay={0.28} />
            <NameLine text={identity.lastName} delay={0.4} />
          </h1>

          {/* Faixa de dados — idade + frase, separadas por régua técnica */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: duration.base, ease: ease.out }}
            className="mt-8 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-start sm:gap-10 md:mt-10 lg:max-w-3xl"
          >
            <p className="flex items-baseline gap-2 leading-none">
              <span className="font-display text-5xl md:text-6xl">{identity.age}</span>
              <span className="kicker pb-1 text-ash">anos</span>
            </p>

            <p className="max-w-[34ch] text-balance text-sm leading-relaxed text-bone/80 md:text-base">
              {identity.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.88, duration: duration.base, ease: ease.out }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Action href="#perfil">Ver perfil</Action>
            <Action href="#highlights" variant="ghost" glyph={<PlayGlyph />}>
              Assistir highlights
            </Action>
          </motion.div>
        </div>
      </motion.div>

      {/* ---------- Sobreposição técnica ---------- */}
      <EdgeMarks />
      <ScrollCue />
    </section>
  );
}

/** Uma linha do nome, revelada por máscara. */
function NameLine({ text, delay }: { text: string; delay: number }) {
  return (
    <span aria-hidden className="block overflow-hidden">
      <motion.span
        initial={{ y: '108%' }}
        animate={{ y: '0%' }}
        transition={{ delay, duration: duration.cinematic, ease: ease.out }}
        className="block text-[clamp(3.75rem,17vw,15rem)] will-change-transform"
      >
        {text}
      </motion.span>
    </span>
  );
}

/**
 * Enquanto o recorte PNG não existe, marcamos a coluna que ele vai ocupar.
 * Assim a composição em camadas fica evidente sem inventar imagem.
 */
function CutoutMarker() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 right-0 z-20 hidden h-[80%] w-[38%] border-l border-dashed border-line lg:block"
    >
      <span className="kicker absolute left-4 top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap text-ash/50">
        camada de recorte — hero-cutout.png
      </span>
    </div>
  );
}

/** Marcações de canto: vocabulário de interface de transmissão esportiva. */
function EdgeMarks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 hidden lg:block">
      <span className="kicker absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-ash/45">
        Jovem atleta · formação
      </span>
      <span className="kicker absolute bottom-8 right-8 text-ash/45">
        {identity.positionShort} / {identity.age}
      </span>
    </div>
  );
}
