import Head from 'next/head';
import { useState } from 'react';
import { NewTabLink } from 'ui';
import fetchApiGateway from '../fetchApiGateway';

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function Store() {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="container">
      <Head>
        <title>Microservices Workshop</title>
      </Head>
      <h1 className="title">
        Microservices <br />
        <span>Workshop</span>
      </h1>
      <div>
        <form
          className="form"
          onSubmit={async (
            e: React.FormEvent<HTMLFormElement> & {
              target: { search: { value: string } };
            }
          ) => {
            e.preventDefault();
            setCountryCode(null);
            setIsLoading(true);

            const search = e.target.search.value;

            // TODO add TS types on GraphQL frontend
            const data = await fetchApiGateway(
              `query { searchCountry(search: "${search}") }`
            );
            setIsLoading(false);
            setCountryCode(data.searchCountry);
          }}
        >
          <input
            type="text"
            name="search"
            placeholder="Entre du texte et je trouve le pays associé…"
          />
          {isLoading ? 'Chargement…' : null}
          {countryCode ? getFlagEmoji(countryCode) : null}
        </form>
      </div>
      <p className="description">
        Built With{' '}
        <NewTabLink href="https://turbo.build/repo">Turborepo</NewTabLink> +{' '}
        <NewTabLink href="https://nextjs.org/">Next.js</NewTabLink>
      </p>
    </div>
  );
}
