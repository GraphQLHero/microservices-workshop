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

      const data = (await response.json()) as { token?: string };
      if (!data.token) {
        return { errorCode: SignInErrorCode.INVALID_CREDENTIALS };
      }

      // We set the jwt token in the cookies for our frontend
      // /!\ We need sameSite=none and secure=true for the cookie to be set
      // See `handleRequest`
      await ctx.request?.cookieStore?.set(SESSION_COOKIE, data.token);

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
