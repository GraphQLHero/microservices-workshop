import { SESSION_COOKIE } from '../../config';
import builder from '../builder';

enum SignInErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
}

builder.enumType(SignInErrorCode, {
  name: 'SignInErrorCode',
});

builder.relayMutationField(
  'signIn',
  {
    inputFields: (t) => ({
      username: t.string({
        required: true,
      }),
      password: t.string({
        required: true,
      }),
    }),
  },
  {
    resolve: async (root, { input }, ctx) => {
      const response = await fetch(`${process.env.AUTH_URL}/authentication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: input.username,
          password: input.password,
        }),
      });
      if (response.status === 401) {
        return { errorCode: SignInErrorCode.INVALID_CREDENTIALS };
      }

      // TODO need to add types
      const data = await response.json();

      // We set the jwt token in the cookies for our frontend
      await ctx.request.cookieStore?.set({
        name: SESSION_COOKIE,
        domain: '',
        expires: Date.now() + 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'none',
        value: data.token,
      });

      return { errorCode: null };
    },
  },
  {
    outputFields: (t) => ({
      errorCode: t.field({
        type: SignInErrorCode,
        nullable: true,
        resolve: (r) => r.errorCode,
      }),
    }),
  }
);
