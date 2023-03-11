import { createServer } from './server';
import { log } from 'logger';

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
  log(`api-gateway running on http://localhost:${port}`);
});
