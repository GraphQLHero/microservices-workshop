import builder from '../builder';

builder.objectType('Viewer', {
  name: 'Viewer',
  description: 'The current logged in user.',
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    name: t.exposeString('name'),
  }),
});
