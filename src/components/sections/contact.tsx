'use client';

import { motion } from 'motion/react';
import { editorial, guardianContact, identity, sectionIndex } from '@/data/player';
import { fadeUp, stagger, tiltIn, viewportOnce } from '@/lib/motion';
import { whatsappLink } from '@/lib/utils';
import { Section } from '@/components/ui/section';
import { Action } from '@/components/ui/action';

/**
 * Canal de contato.
 *
 * PROTEÇÃO DO MENOR: nenhum dado de contato do Arthur é publicado. O site
 * expõe apenas os canais do responsável legal, e só quando preenchidos em
 * `player.guardianContact`.
 */
export function Contact() {
  const message = `Olá! Vi o site do ${identity.fullName} e gostaria de falar sobre o atleta.`;
  const whatsapp = whatsappLink(guardianContact.whatsapp, message);
  const hasChannel = Boolean(whatsapp || guardianContact.email);

  return (
    <Section
      id="contato"
      index={sectionIndex.contato}
      title="Contato"
      lead={editorial.contact.lead}
      tone="carbon"
    >
      <motion.div
        variants={stagger(0, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="border-t border-line"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <motion.div
            variants={tiltIn}
            className="border-b border-line py-10 lg:col-span-7 lg:border-b-0 lg:border-r lg:py-14 lg:pr-16"
          >
            <p className="kicker text-accent">{editorial.contact.eyebrow}</p>
            <h3 className="mt-6 max-w-[12ch] font-display text-[clamp(2.5rem,7vw,5.75rem)] leading-[0.9]">
              {editorial.contact.title}
            </h3>
            <p className="text-support mt-6 max-w-[48ch] text-ash">{editorial.contact.body}</p>

            {hasChannel ? (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
                {whatsapp ? (
                  <Action href={whatsapp} external>
                    Falar no WhatsApp
                  </Action>
                ) : null}
                {guardianContact.email ? (
                  <Action href={`mailto:${guardianContact.email}`} variant="ghost">
                    Enviar e-mail
                  </Action>
                ) : null}
              </div>
            ) : (
              <div className="mt-9">
                <Action href="#contato" disabled aria-label="Contato ainda não disponível">
                  Contato em breve
                </Action>
              </div>
            )}
          </motion.div>

          <motion.dl
            variants={tiltIn}
            className="py-4 lg:col-span-5 lg:py-8 lg:pl-12"
            aria-label="Dados do contato responsável"
          >
            <Row label="Responsável" value={guardianContact.name} />
            <Row label="Vínculo" value={guardianContact.relationship} />
            <Row label="WhatsApp" value={guardianContact.whatsapp ? 'Disponível' : null} />
            <Row label="E-mail" value={guardianContact.email} />
          </motion.dl>
        </div>

        <motion.aside
          variants={fadeUp}
          className="grid gap-4 border-t border-line py-7 md:grid-cols-[12rem_1fr] md:items-start md:gap-10"
          aria-labelledby="protecao-title"
        >
          <p id="protecao-title" className="kicker text-accent">
            Proteção do atleta
          </p>
          <div className="max-w-[68ch]">
            <p className="text-support text-ash">{editorial.contact.privacy}</p>
            <p className="mt-3 text-sm leading-relaxed text-ash/75">{guardianContact.note}</p>
          </div>
        </motion.aside>
      </motion.div>
    </Section>
  );
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-line py-5 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8">
      <dt className="kicker text-ash">{label}</dt>
      <dd className="font-display text-xl leading-none md:text-2xl">
        {value ?? <span className="text-ash">—</span>}
      </dd>
    </div>
  );
}
