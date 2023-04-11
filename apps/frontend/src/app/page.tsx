'use client';
import { useState } from 'react';
import fetchApiGateway from '../fetchApiGateway';
import { NewTabLink } from 'ui';

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function Home() {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <main className="flex flex-col min-h-full items-center justify-between p-24">
      <form
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
        <div className="max-w-5xl">
          <label
            htmlFor="search"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Entrez du texte et je devine le pays lié
          </label>
          <div className="mt-2">
            <textarea
              rows={4}
              name="search"
              id="search"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
              defaultValue={''}
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {isLoading ? 'Chargement…' : null}
          {countryCode ? getFlagEmoji(countryCode) : null}
        </div>
      </form>
      <p>
        Built With{' '}
        <NewTabLink href="https://turbo.build/repo">Turborepo</NewTabLink> +{' '}
        <NewTabLink href="https://nextjs.org/">Next.js</NewTabLink>
      </p>
    </main>
  );
}
