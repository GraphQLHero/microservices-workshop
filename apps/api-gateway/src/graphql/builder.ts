import SchemaBuilder from '@pothos/core';
import RelayPlugin from '@pothos/plugin-relay';
import { Viewer } from '../auth/getViewerFromRequest';

const builder = new SchemaBuilder<{ Objects: { Viewer: Viewer } }>({
  plugins: [RelayPlugin],
  relayOptions: {
    // These will become the defaults in the next major version
    clientMutationId: 'omit',
    cursorType: 'String',
  },
});

export default builder;
