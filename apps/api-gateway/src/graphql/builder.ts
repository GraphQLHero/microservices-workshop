import SchemaBuilder from '@pothos/core';
import RelayPlugin from '@pothos/plugin-relay';
import { Viewer } from '../auth/getViewerFromRequest';
import { NextRequest } from 'next/server';

export type GraphQLContext = {
  sessionCookie?: string;
  viewer?: Viewer | null;
  request?: NextRequest;
};

const builder = new SchemaBuilder<{
  Context: GraphQLContext;
  Objects: { Viewer: Viewer };
}>({
  plugins: [RelayPlugin],
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String',
  },
});

export default builder;
