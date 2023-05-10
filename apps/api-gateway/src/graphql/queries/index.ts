import { components as country } from '@/__generated__/country-guesser';
import builder from '../builder';
import { components as topSearch } from '@/__generated__/top-search';

type SearchPayload = country['schemas']['SearchPayload'];
type TopSearchPayload = topSearch['schemas']['TopSearchPayload'];

builder.queryType({
  fields: (t) => ({
    viewer: t.field({
      type: 'Viewer',
      nullable: true,
      resolve: (_, {}, ctx) => ctx.viewer,
    }),
    searchCountry: t.string({
      nullable: true,
      args: {
        search: t.arg.string({ required: true }),
      },
      resolve: async (_parent, { search }) => {
        const response = await fetch(
          `${process.env.COUNTRY_GUESSER_URL}/search/${search}`
        );

        const data = (await response.json()) as SearchPayload;
        return data.value;
      },
    }),
    topSearch: t.field({
      type: ['TopSearch'],
      nullable: true,
      args: {},
      resolve: async () => {
        const response = await fetch(`${process.env.TOP_SEARCH_URL}/top`);

        try {
          const data = (await response.json()) as TopSearchPayload;
          return data;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  }),
});
