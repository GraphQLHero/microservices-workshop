import builder from '../builder';

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string({ required: true, defaultValue: 'world' }),
      },
      resolve: (_parent, { name }) => name,
    }),
    viewer: t.field({
      type: 'Viewer',
      nullable: true,
      resolve: (_, {}, ctx) => ctx.viewer,
    }),
    searchCountry: t.string({
      args: {
        search: t.arg.string({ required: true }),
      },
      resolve: async (_parent, { search }) => {
        const response = await fetch(
          `${process.env.COUNTRY_GUESSER_URL}/search/${search}`
        );

        // TODO need to add types
        const data = await response.json();
        return data.value;
      },
    }),
  }),
});
