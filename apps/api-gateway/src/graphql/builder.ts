import SchemaBuilder from '@pothos/core';
import RelayPlugin from '@pothos/plugin-relay';
import { Viewer } from '../auth/getViewerFromRequest';
import { NextRequest } from 'next/server';

const builder = new SchemaBuilder<{
  Context: { request: NextRequest; viewer: Viewer | null };
  Objects: { Viewer: Viewer };
}>({
  plugins: [RelayPlugin],
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String',
  },
});

export default builder;
