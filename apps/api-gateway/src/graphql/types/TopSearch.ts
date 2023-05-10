import builder from '../builder';

builder.objectType('TopSearch', {
  description: 'The number or time a country was searched.',
  fields: (t) => ({
    country: t.exposeString('country'),
    value: t.exposeInt('value'),
    percentage: t.exposeInt('percentage'),
  }),
});
