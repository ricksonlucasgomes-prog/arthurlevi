import { guardianContact, identity, social } from '@/data/player';
import { whatsappLink } from '@/lib/utils';

/**
 * Rodapé mínimo. Sem JavaScript: é conteúdo estático e não precisa de nenhum.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const whatsapp = whatsappLink(guardianContact.whatsapp, `Contato sobre ${identity.fullName}`);

  return (
    <footer className="border-t border-line bg-ink">
      <div className="shell py-16 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-[clamp(2.5rem,9vw,6rem)] leading-[0.85]">
              {identity.firstName}
              <br />
              {identity.lastName}
            </p>
            <p className="kicker mt-5 text-ash">Young football athlete</p>
          </div>

          <div className="flex flex-col gap-8 md:items-end md:text-right">
            {social.instagram ? (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="kicker underline-grow self-start text-bone md:self-end"
              >
                Instagram
              </a>
            ) : null}

            <div>
              <p className="kicker text-ash">Contato do responsável</p>
              <ul className="mt-3 space-y-2 text-sm">
                {guardianContact.name ? <li>{guardianContact.name}</li> : null}
                {whatsapp ? (
                  <li>
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-grow"
                    >
                      WhatsApp
                    </a>
                  </li>
                ) : null}
                {guardianContact.email ? (
                  <li>
                    <a href={`mailto:${guardianContact.email}`} className="underline-grow">
                      {guardianContact.email}
                    </a>
                  </li>
                ) : null}
                {!guardianContact.name && !whatsapp && !guardianContact.email ? (
                  <li className="text-ash">A definir</li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="kicker text-ash">
            © {year} {identity.fullName}
          </p>
          <p className="kicker text-ash/60">
            {identity.position} · {identity.age} anos
          </p>
        </div>
      </div>
    </footer>
  );
}
