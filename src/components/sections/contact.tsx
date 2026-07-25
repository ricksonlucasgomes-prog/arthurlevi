'use client';

import { motion } from 'motion/react';
import { guardianContact, identity } from '@/data/player';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
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
      index="10"
      title="Contato"
      lead="Todo contato referente ao atleta é intermediado pelo responsável legal."
      tone="carbon"
    >
      <motion.div
        variants={stagger(0, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
      >
        <div className="lg:col-span-7">
          <motion.dl variants={fadeUp} className="border-t border-line">
            <Row label="Responsável" value={guardianContact.name} />
            <Row label="Vínculo" value={guardianContact.relationship} />
            <Row label="WhatsApp" value={guardianContact.whatsapp ? 'Disponível' : null} />
            <Row label="E-mail" value={guardianContact.email} />
          </motion.dl>

          {hasChannel ? (
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
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
            </motion.div>
          ) : (
            <motion.div variants={fadeUp} className="mt-10">
              <Action href="#contato" disabled aria-label="Contato ainda não disponível">
                Contato em breve
              </Action>
              <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-ash">
                Para ativar os botões, preencha{' '}
                <code className="font-mono text-xs text-bone">guardianContact</code> em{' '}
                <code className="font-mono text-xs text-bone">src/data/player.ts</code> com nome,
                WhatsApp (somente dígitos, com DDI e DDD) e e-mail do responsável.
              </p>
            </motion.div>
          )}
        </div>

        <motion.aside
          variants={fadeUp}
          className="border border-line p-6 md:p-8 lg:col-span-5"
          aria-labelledby="protecao-title"
        >
          <p className="kicker text-accent">Proteção do atleta</p>
          <h3 id="protecao-title" className="mt-5 font-display text-2xl leading-tight md:text-3xl">
            Arthur tem {identity.age} anos
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-ash">
            Por decisão da família, este site não divulga endereço, escola, telefone ou e-mail
            pessoal do atleta, rotina, horários de treino ou qualquer localização.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ash">{guardianContact.note}</p>
        </motion.aside>
      </motion.div>
    </Section>
  );
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-line py-5 sm:grid-cols-[minmax(0,12rem)_1fr] sm:items-baseline sm:gap-8">
      <dt className="kicker text-ash">{label}</dt>
      <dd className="font-display text-xl leading-none md:text-2xl">
        {value ?? <span className="text-ash">—</span>}
      </dd>
    </div>
  );
}
