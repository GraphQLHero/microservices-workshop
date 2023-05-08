# Microservices Workshop

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `country-guesser`: a [Next.js 13](https://beta.nextjs.org/docs) service to guess a country from a text using OpenAI ([API docs](https://microservices-workshop-country-guesser.vercel.app))
- `api-gateway`: a [Next.js 13](https://beta.nextjs.org/docs) & [Pothos](https://pothos-graphql.dev/) GraphQL API Gateway ([API docs](https://microservices-workshop-api-gateway.vercel.app))
- `auth`: a [Next.js 13](https://beta.nextjs.org/docs) very simple authentication service & user storage ([API docs](https://microservices-workshop-auth.vercel.app))
- `frontend`: a [Next.js 13](https://beta.nextjs.org/docs) frontend app (exposed at https://microservices-workshop.graphqlhero.com/)
- `logger`: isomorphic logger (a small wrapper around console.log)
- `ui`: a dummy React UI library
- TypeScript, Jest and ESLint configurations used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

## Using this workshop

Run the following command:

```sh
git clone git@github.com:GraphQLHero/microservices-workshop.git microservices-workshop
cd microservices-workshop
pnpm install
pnpm dev
```
