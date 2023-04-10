// https://beta.nextjs.org/docs/routing/route-handlers
import { createYoga } from 'graphql-yoga';
import { useCookies } from '@whatwg-node/server-plugin-cookies';
import schema from '../../graphql/schema';
import { NextRequest } from 'next/server';
import getViewerFromRequest from '../../auth/getViewerFromRequest';

const yoga = createYoga({
  graphqlEndpoint: '/graphql',
  cors: {
    origin: [
      // Frontend [Dev]
      'http://localhost:3002',
      // GraphiQL [Dev]
      'http://localhost:3004',
      // Frontend [Prod]
      'https://microservices-workshop-frontend.vercel.app',
    ],
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
  // eslint-disable-next-line
  plugins: [useCookies()],
});

const handleRequest = async (request: Request, context: any) => {
  // The GraphQL context is passed to all resolvers
  const response = await yoga.handleRequest(request, context);

  const headersObj: any = {};
  response.headers.forEach((value, key) => {
    headersObj[key] = value;
  });

  return new Response(response.body, {
    status: response.status,
    headers: headersObj,
  });
};

// Preflight requests
export async function OPTIONS(request: Request) {
  return handleRequest(request, {});
}

// Renders GraphiQL
export async function GET(request: Request) {
  return handleRequest(request, {});
}

// Executes GraphQL requests
export async function POST(request: NextRequest) {
  // The GraphQL context is passed to all resolvers
  const context = {
    viewer: getViewerFromRequest(request),
  };

  return handleRequest(request, context);
}
