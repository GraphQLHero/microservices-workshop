# Microservices Workshop

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `api-gateway`: a [Next.js 13](https://beta.nextjs.org/docs) GraphQL server
- `country-guesser`: a [Next.js 13](https://beta.nextjs.org/docs) server (https://microservices-workshop-country-guesser.vercel.app)
- `frontend`: a [Next.js 13](https://beta.nextjs.org/docs) app
- `logger`: isomorphic logger (a small wrapper around console.log)
- `ui`: a dummy React UI library
- `scripts`: Jest and ESLint configurations
- `tsconfig`: tsconfig.json;s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

## Using this example

Run the following command:

```sh
git clone git@github.com:GraphQLHero/microservices-workshop.git microservices-workshop
cd microservices-workshop
pnpm install
git init . && git add . && git commit -m "Init"
```
