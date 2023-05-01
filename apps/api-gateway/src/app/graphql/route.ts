// https://beta.nextjs.org/docs/routing/route-handlers
import { createYoga } from 'graphql-yoga';
import schema from '../../graphql/schema';
import { NextRequest, NextResponse } from 'next/server';
import getViewerFromRequest, { Viewer } from '../../auth/getViewerFromRequest';
import { SESSION_COOKIE } from '../../config';
import { GraphQLContext } from '../../graphql/builder';
import { useCookies } from '@whatwg-node/server-plugin-cookies';

const yoga = createYoga({
  graphqlEndpoint: '/graphql',
  cors: {
    origin: '*',
    credentials: true,
    methods: ['HEAD', 'GET', 'POST'],
  },
  schema,
  graphiql: {
    defaultQuery: /* GraphQL */ `
      {
        searchCountry(search: "Rome")
      }
    `,
  },
  // This is not a React hook, it's a GraphQL plugin
  // eslint-disable-next-line react-hooks/rules-of-hooks
  plugins: [useCookies()],
});

const handleRequest = async (request: NextRequest, context: GraphQLContext) => {
  // The GraphQL context is passed to all resolvers
  const yogaResponse = await yoga.handleRequest(request, context);

  const headersObj: any = {};
  yogaResponse.headers.forEach((value, key) => {
    headersObj[key] = value;
  });

  const response = new NextResponse(yogaResponse.body, {
    status: yogaResponse.status,
    headers: headersObj,
  });

  // Patch to allow a sameSite "none" cookie to be set
  const sessionCookie = (
    await context.request?.cookieStore?.get(SESSION_COOKIE)
  )?.value;
  if (sessionCookie) {
    console.log('Setting session cookie: ', sessionCookie);
    response.cookies.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      domain:
        process.env.NODE_ENV === 'development' ? 'localhost' : 'vercel.app',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: 'none',
    });
  }

  return response;
};

// Preflight requests
export async function OPTIONS(request: NextRequest) {
  return handleRequest(request, {});
}

// Renders GraphiQL
export async function GET(request: NextRequest) {
  return handleRequest(request, {});
}

// Executes GraphQL requests
export async function POST(request: NextRequest) {
  // The GraphQL context is passed to all resolvers
  const context = {
    viewer: await getViewerFromRequest(request),
    request,
  };

  return handleRequest(request, context);
}
