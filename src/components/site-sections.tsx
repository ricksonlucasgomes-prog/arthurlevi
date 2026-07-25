'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { PlayerData } from '@/data/player';

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#8D8D8D]">{eyebrow}</p>
      <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.03em] text-[#F5F5F2] sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-[#8D8D8D]">{description}</p>
    </div>
  );
}

function AccentLine() {
  return <div className="h-px w-24 bg-[#F5F5F2]/20" />;
}

export function SiteSections({ player }: { player: PlayerData }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-[#080808] text-[#F5F5F2]">
      <section id="home" className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_45%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-12">
          <nav className="flex items-center justify-between border border-white/10 bg-black/20 px-4 py-3 backdrop-blur md:px-6">
            <Link href="#home" className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F5F5F2]">
              Arthur Levi
            </Link>
            <div className="hidden items-center gap-6 text-sm text-[#8D8D8D] md:flex">
              <Link href="#perfil" className="transition hover:text-[#F5F5F2]">
                Perfil
              </Link>
              <Link href="#highlights" className="transition hover:text-[#F5F5F2]">
                Highlights
              </Link>
              <Link href="#trajetoria" className="transition hover:text-[#F5F5F2]">
                Trajetória
              </Link>
              <Link href="#contato" className="transition hover:text-[#F5F5F2]">
                Contato
              </Link>
            </div>
          </nav>

          <div className="grid flex-1 gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:py-16">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col justify-end space-y-8"
            >
              <div className="space-y-4">
                <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#8D8D8D]">
                  Young football athlete
                </p>
                <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.8] tracking-[-0.05em] sm:text-6xl lg:text-7xl xl:text-[7.5rem]">
                  <span className="block">Arthur</span>
                  <span className="block">Levi</span>
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.3em] text-[#F5F5F2]">
                  <span className="rounded-full border border-white/15 px-3 py-2">Atacante</span>
                  <span className="rounded-full border border-white/15 px-3 py-2">12 anos</span>
                </div>
              </div>

              <p className="max-w-xl text-lg leading-8 text-[#8D8D8D]">{player.headline}</p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.a
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  href="#perfil"
                  className="inline-flex items-center justify-center rounded-full border border-[#F5F5F2] bg-[#F5F5F2] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#080808] transition"
                >
                  Ver perfil
                </motion.a>
                <motion.a
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  href="#highlights"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#F5F5F2] transition hover:bg-white/10"
                >
                  Assistir highlights
                </motion.a>
              </div>

              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-[#8D8D8D]">
                <span className="h-px w-10 bg-[#8D8D8D]" />
                Scroll
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-[2rem] border border-white/10" />
              <Image
                src={player.media.hero}
                alt="Placeholder editorial para o atleta Arthur Levi"
                width={1200}
                height={1500}
                priority
                className="h-[480px] w-full rounded-[2rem] object-cover object-center sm:h-[560px]"
              />
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 max-w-sm p-6 sm:p-8">
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#8D8D8D]">Perfil em construção</p>
                <p className="mt-3 text-xl font-semibold leading-7 text-[#F5F5F2]">
                  Este espaço será substituído por uma fotografia profissional quando o material real for disponibilizado.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="perfil" className="border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Perfil do atleta"
            title="Uma trajetória em formação"
            description="A apresentação editorial é pensada para comunicar profissionalismo, evolução e seriedade desde os primeiros contatos." 
          />
          <div className="space-y-8">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-[2rem] border border-white/10 bg-[#111111] p-8"
            >
              <p className="max-w-2xl text-lg leading-8 text-[#F5F5F2]">{player.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 px-3 py-2 text-sm text-[#8D8D8D]">Foco</span>
                <span className="rounded-full border border-white/10 px-3 py-2 text-sm text-[#8D8D8D]">Disciplina</span>
                <span className="rounded-full border border-white/10 px-3 py-2 text-sm text-[#8D8D8D]">Ambição</span>
                <span className="rounded-full border border-white/10 px-3 py-2 text-sm text-[#8D8D8D]">Crescimento</span>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {player.profileFields.map((field) => (
                <div key={field.label} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#8D8D8D]">{field.label}</p>
                  <p className="mt-2 text-lg font-semibold text-[#F5F5F2]">{field.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="Player profile"
            title="Atributos prontos para evolução"
            description="Esta área se transforma em um verdadeiro scouting profile quando as avaliações e dados reais forem disponibilizados." 
          />
          <div className="space-y-4">
            {player.attributes.map((attribute, index) => (
              <motion.div
                key={attribute.label}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-[1.5rem] border border-white/10 bg-[#111111] p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xl font-semibold uppercase tracking-[0.2em] text-[#F5F5F2]">{attribute.label}</p>
                  <span className="text-sm uppercase tracking-[0.3em] text-[#8D8D8D]">
                    {attribute.value ?? 'Aguardando nota'}
                  </span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-1/2 rounded-full bg-[#F5F5F2]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow="Em campo"
            title="Características e contexto"
            description="Os próximos conteúdos serão adicionados com base em avaliações, treinos e evolução real do atleta." 
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {player.characteristics.map((item, index) => (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-7"
              >
                <AccentLine />
                <h3 className="mt-5 text-xl font-semibold uppercase tracking-[0.2em] text-[#F5F5F2]">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#8D8D8D]">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="highlights" className="border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Highlights"
            title="Uma experiência cinematográfica para o futuro"
            description="A seção será preparada para vídeos reais, tanto em formato local quanto em plataformas como YouTube e Vimeo." 
          />
          <div className="space-y-6">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111]"
            >
              <Image
                src={player.media.videoPoster}
                alt="Placeholder de vídeo para highlights do atleta"
                width={1200}
                height={800}
                className="h-[360px] w-full object-cover sm:h-[460px]"
              />
              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-5">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#8D8D8D]">Preview</p>
                  <p className="mt-2 text-xl font-semibold text-[#F5F5F2]">Material futuro</p>
                </div>
                <div className="rounded-full border border-white/15 px-4 py-2 text-sm uppercase tracking-[0.25em] text-[#8D8D8D]">
                  Em breve
                </div>
              </div>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {player.highlights.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#8D8D8D]">{item.platform}</p>
                  <h3 className="mt-3 text-xl font-semibold text-[#F5F5F2]">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[#8D8D8D]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow="Galeria"
            title="Narrativa editorial em diferentes proporções"
            description="Quando as fotos reais chegarem, esta galeria será transformada em uma experiência mais volumétrica e emocional." 
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {player.media.gallery.map((image, index) => (
              <motion.div
                key={image}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111111] ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <Image
                  src={image}
                  alt={`Placeholder editorial ${index + 1} para Arthur Levi`}
                  width={1200}
                  height={1400}
                  className="h-full min-h-[280px] w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="trajetoria" className="border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Trajetória"
            title="Linha do tempo esportiva"
            description="Esta seção será alimentada com equipes, categorias, campeonatos, eventos e conquistas futuras." 
          />
          <div className="space-y-4">
            {player.career.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-[#111111] p-6">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#8D8D8D]">{item.year}</p>
                <h3 className="mt-3 text-xl font-semibold uppercase tracking-[0.2em] text-[#F5F5F2]">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#8D8D8D]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow="Estatísticas"
            title="Dados prontos para atualização"
            description="As métricas serão inseridas em um único arquivo de dados quando houver registros oficiais." 
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {player.statistics.map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-[#111111] p-6">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#8D8D8D]">{item.label}</p>
                <p className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#F5F5F2]">{item.value ?? '—'}</p>
                <p className="mt-3 text-base text-[#8D8D8D]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {player.achievements.length > 0 ? (
        <section className="border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl space-y-10">
            <SectionHeading
              eyebrow="Conquistas"
              title="Títulos e destaques"
              description="Esta seção será ativada quando houver informações reais e verificáveis." 
            />
            <div className="grid gap-4 md:grid-cols-2">
              {player.achievements.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-[#111111] p-6">
                  <h3 className="text-xl font-semibold uppercase tracking-[0.2em] text-[#F5F5F2]">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[#8D8D8D]">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="contato" className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-white/10 bg-[#111111] p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div className="space-y-5">
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#8D8D8D]">Contato profissional</p>
            <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.03em] text-[#F5F5F2] sm:text-4xl">
              Interessado em conhecer melhor o atleta?
            </h2>
            <p className="max-w-xl text-lg leading-8 text-[#8D8D8D]">
              Para informações esportivas, avaliações, oportunidades ou contato profissional, fale diretamente com o responsável legal.
            </p>
            <motion.a
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }}
              href={`mailto:${player.guardianContact.email}`}
              className="inline-flex items-center rounded-full border border-[#F5F5F2] bg-[#F5F5F2] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#080808]"
            >
              Entrar em contato
            </motion.a>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#8D8D8D]">Responsável</p>
            <p className="mt-3 text-2xl font-semibold text-[#F5F5F2]">{player.guardianContact.name}</p>
            <div className="mt-6 space-y-4 text-base text-[#8D8D8D]">
              <p>WhatsApp: {player.guardianContact.whatsapp}</p>
              <p>E-mail: {player.guardianContact.email}</p>
              <p className="pt-4 text-sm">O contato da criança é protegido e intermediado pelo responsável legal.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-sm text-[#8D8D8D] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold uppercase tracking-[0.3em] text-[#F5F5F2]">Arthur Levi</p>
            <p className="mt-1">Young football athlete</p>
          </div>
          <div className="flex flex-col gap-1 sm:items-end">
            {player.social.instagram ? <a href={player.social.instagram} className="transition hover:text-[#F5F5F2]">Instagram</a> : <span>Aguardando Instagram</span>}
            <span>© {new Date().getFullYear()} Arthur Levi</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
