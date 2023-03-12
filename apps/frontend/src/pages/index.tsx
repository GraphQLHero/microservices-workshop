import { log } from 'logger';
import Head from 'next/head';
import { useState } from 'react';
import { NewTabLink } from 'ui';

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function Store() {
  log('Hey! This is Home.');
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

            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/graphql`,
              {
                method: 'POST',
                body: `query { searchCountry(search: "${search}") }`,
                headers: {
                  Accept: `application/json`,
                  'Content-Type': 'application/graphql',
                },
              }
            );
            setIsLoading(false);
            const { data } = await response.json();
            setCountryCode(data.searchCountry);
          }}
        >
          <input
            type="text"
            name="search"
            placeholder="Entre le nom d'une ville et je devine le pays…"
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
