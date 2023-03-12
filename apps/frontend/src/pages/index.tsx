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
  return (
    <div className="container">
      <Head>
        <title>Store | Kitchen Sink</title>
      </Head>
      <h1 className="title">
        Microservices <br />
        <span>Workshop</span>
      </h1>
      <div>
        <form
          className="form"
          onSubmit={async (e) => {
            e.preventDefault();
            setCountryCode(null);

            // Get the value of the input field
            // @ts-expect-error search is not defined on the target
            const search = e.target.search?.value;

            alert(`Searching for ${search}`);
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
            const { data } = await response.json();
            setCountryCode(data.searchCountry);
          }}
        >
          <input
            type="text"
            name="search"
            placeholder="Type something and I guess the country…"
          />
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
