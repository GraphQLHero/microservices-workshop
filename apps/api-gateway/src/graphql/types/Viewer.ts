import { components as topSearch } from '@/__generated__/top-search';
import builder from '../builder';

type TopSearchPayload = topSearch['schemas']['TopSearchPayload'];

builder.objectType('Viewer', {
  description: 'The current logged in user.',
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    name: t.exposeString('name'),
    admin: t.exposeBoolean('admin'),
    topSearch: t.field({
      type: ['TopSearch'],
      nullable: true,
      resolve: async (obj) => {
        const response = await fetch(
          `${process.env.TOP_SEARCH_URL}/users/${obj.id}/top`
        );

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
