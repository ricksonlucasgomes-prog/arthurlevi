import { bio, identity, social } from '@/data/player';
import { siteConfig } from '@/data/site';

/**
 * Dados estruturados (schema.org).
 *
 * PROTEÇÃO DO MENOR: de propósito não expomos data de nascimento, endereço
 * nem qualquer localização precisa. Só entram no schema campos que já são
 * públicos no site e que não permitem localizar o atleta.
 */
export function PersonJsonLd() {
  const sameAs = [social.instagram, social.youtube, social.tiktok].filter(
    (link): link is string => Boolean(link),
  );

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: identity.fullName,
    givenName: identity.firstName,
    familyName: identity.lastName,
    url: siteConfig.url,
    description: `${identity.position} de ${identity.age} anos em formação no futebol.`,
    knowsAbout: 'Futebol',
    ...(bio.club ? { memberOf: { '@type': 'SportsTeam', name: bio.club } } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    url: siteConfig.url,
    inLanguage: siteConfig.locale,
    about: { '@type': 'Person', name: identity.fullName },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
