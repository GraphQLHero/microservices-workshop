import builder from '../builder';

enum LogoutErrorCode {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

builder.enumType(LogoutErrorCode, {
  name: 'LogoutErrorCode',
});

builder.relayMutationField(
  'logout',
  {
    inputFields: (t) => ({
      // We need a dumb field to make the input non-empty
      viewerId: t.id({ required: false }),
    }),
  },
  {
    resolve: async (root, { input }, ctx) => {
      await ctx.request.cookieStore?.delete('jwt');

      return { errorCode: null };
    },
  },
  {
    outputFields: (t) => ({
      errorCode: t.field({
        type: LogoutErrorCode,
        nullable: true,
        resolve: (r) => r.errorCode,
      }),
    }),
  }
);
