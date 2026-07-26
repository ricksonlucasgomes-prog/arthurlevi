'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from 'motion/react';
import { display, identity, media, sectionVisibility } from '@/data/player';
import { useMotionOK } from '@/hooks/use-motion-ok';
import { useMounted } from '@/hooks/use-mounted';
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
  const mounted = useMounted();
  // Parallax de scroll só depois da montagem — ver `useMounted`.
  const parallax = animate && mounted;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Transformação cinematográfica na saída da hero.
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '32%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const backdropY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const backdropClip = useTransform(
    scrollYProgress,
    [0, 0.72],
    ['circle(82% at 72% 50%)', 'circle(48% at 72% 50%)'],
  );

  /*
   * As duas linhas do nome saem em velocidades diferentes — a separação entre
   * elas durante o scroll é o que vende a tipografia como camadas físicas,
   * não como um bloco único de texto.
   */
  const firstLineY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const lastLineY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);

  // Parallax de ponteiro — deslocamento de poucos pixels, só no desktop.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.7 });

  const backdropShiftX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const backdropShiftY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const cutoutShiftX = useTransform(smoothX, [-0.5, 0.5], [-26, 26]);
  const cutoutShiftY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);

  /*
   * Profundidade 3D de ponteiro: a tipografia e o recorte giram poucos graus
   * em sentidos opostos, como planos de um set filmado em dolly. Ângulos
   * curtos de propósito — acima disso vira efeito de vitrine.
   */
  const contentRotateX = useTransform(smoothY, [-0.5, 0.5], [1.7, -1.7]);
  const contentRotateY = useTransform(smoothX, [-0.5, 0.5], [-2.4, 2.4]);
  const cutoutRotateY = useTransform(smoothX, [-0.5, 0.5], [3, -3]);

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
        style={
          parallax
            ? { scale: backdropScale, y: backdropY, clipPath: backdropClip }
            : undefined
        }
        className="absolute inset-0"
      >
        <motion.div
          style={interact ? { x: backdropShiftX, y: backdropShiftY } : undefined}
          className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[58%]"
        >
          <MediaFrame
            slot={media.heroBackground}
            className="h-full w-full [&_img]:object-[66%_center] lg:[&_img]:object-center"
            sizes="(min-width: 1024px) 58vw, 100vw"
            preload
          />
          {/* Máscara que funde a foto no preto e devolve legibilidade ao texto */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10 lg:bg-gradient-to-r lg:from-ink lg:via-ink/55 lg:to-transparent"
          />
        </motion.div>
      </motion.div>

      <motion.p
        aria-hidden
        style={parallax ? { opacity: contentOpacity } : undefined}
        className="pointer-events-none absolute -right-[0.06em] top-1/2 z-[5] hidden -translate-y-1/2 font-display text-[62vw] leading-none text-bone/[0.035] lg:block"
      >
        {identity.age}
      </motion.p>

      {/* ---------- Camada 3: recorte do atleta (passa por cima do nome) ---------- */}
      {media.heroCutout.src ? (
        <motion.div
          style={
            interact
              ? {
                  x: cutoutShiftX,
                  y: cutoutShiftY,
                  rotateY: cutoutRotateY,
                  transformPerspective: 1200,
                }
              : undefined
          }
          className="pointer-events-none absolute bottom-0 right-0 z-20 h-[62%] w-[72%] sm:h-[70%] sm:w-[58%] lg:h-[92%] lg:w-[46%]"
        >
          <MediaFrame
            slot={media.heroCutout}
            className="h-full w-full [&_img]:object-contain [&_img]:object-bottom"
            sizes="(min-width: 1024px) 46vw, 72vw"
            preload
          />
        </motion.div>
      ) : display.showPendingSections ? (
        <CutoutMarker />
      ) : null}

      {/* ---------- Camada 2 + 4: tipografia e informação ---------- */}
      <motion.div
        style={parallax ? { y: contentY, opacity: contentOpacity } : undefined}
        className="relative z-10 flex min-h-svh flex-col justify-end pb-20 pt-24 sm:pb-24 lg:justify-center lg:pb-32 lg:pt-28"
      >
        {/* Plano 3D interno: o giro de ponteiro fica separado do parallax de
            scroll do contêiner para as duas transformações não competirem. */}
        <motion.div
          style={
            interact
              ? {
                  rotateX: contentRotateX,
                  rotateY: contentRotateY,
                  transformPerspective: 1400,
                }
              : undefined
          }
          className="shell"
        >
          <p className="kicker mb-3 flex items-center gap-3 text-accent md:mb-5 lg:mb-7">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {identity.position}
          </p>

          <h1 className="font-display uppercase leading-[0.84] tracking-[-0.025em] lg:leading-[0.78]">
            <span className="sr-only">
              {identity.fullName} — {identity.position}, {identity.age} anos
            </span>
            <NameLine text={identity.firstName} style={parallax ? { y: firstLineY } : undefined} />
            <NameLine
              text={identity.lastName}
              style={parallax ? { y: lastLineY } : undefined}
              photoFill
            />
          </h1>

          {/* Faixa de dados — idade + frase, separadas por régua técnica */}
          <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-5 border-t border-line pt-4 sm:flex sm:items-start sm:gap-10 md:mt-8 md:pt-6 lg:mt-10 lg:max-w-3xl">
            <p className="flex items-baseline gap-2 leading-none">
              <span className="font-display text-4xl sm:text-5xl md:text-6xl">{identity.age}</span>
              <span className="kicker pb-1 text-ash">anos</span>
            </p>

            <p className="max-w-[34ch] text-balance text-sm leading-snug text-bone/80 sm:text-base sm:leading-[1.65]">
              {identity.tagline}
            </p>
          </div>

          <div className="mt-5 flex gap-3 sm:gap-4 md:mt-8">
            <Action href="#perfil" className="w-full sm:w-auto">
              Ver perfil
            </Action>
            {sectionVisibility.highlights ? (
              <Action
                href="#highlights"
                variant="ghost"
                glyph={<PlayGlyph />}
                className="hidden sm:inline-flex"
              >
                Assistir highlights
              </Action>
            ) : null}
          </div>
        </motion.div>
      </motion.div>

      {/* ---------- Sobreposição técnica ---------- */}
      <EdgeMarks />
      <ScrollCue />
    </section>
  );
}

/**
 * Uma linha do nome. `style` recebe o parallax diferencial de scroll;
 * `photoFill` preenche as letras com a própria foto da hero em duotone de
 * vermelho — nenhuma imagem nova é criada, a textura é a foto real já publicada.
 */
function NameLine({
  text,
  style,
  photoFill = false,
}: {
  text: string;
  style?: MotionStyle;
  photoFill?: boolean;
}) {
  const fill =
    photoFill && media.heroBackground.src
      ? {
          // Gradiente vermelho + foto com blend "color": a luminância vem da
          // foto, o tom vem da paleta — as letras viram janelas para a imagem.
          backgroundImage: `linear-gradient(rgb(255 59 31 / 0.85), rgb(255 59 31 / 0.45)), url(${media.heroBackground.src})`,
          backgroundBlendMode: 'color' as const,
          backgroundSize: 'cover',
          backgroundPosition: '66% 30%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }
      : undefined;

  return (
    <span aria-hidden className="block overflow-hidden">
      <motion.span
        style={style}
        className="block text-[clamp(4.5rem,21vw,6rem)] lg:text-[clamp(4.5rem,18.5vw,16.5rem)]"
      >
        <span style={fill} className="inline-block">
          {text}
        </span>
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
