// https://beta.nextjs.org/docs/routing/route-handlers
import { createYoga } from 'graphql-yoga';
import schema from '../../graphql/schema';

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
export async function POST(request: Request) {
  // The GraphQL context is passed to all resolvers
  const context = {};
  return handleRequest(request, context);
}
