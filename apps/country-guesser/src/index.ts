import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env.local' });
import { createServer } from './server';
import { log } from 'logger';

const port = process.env.PORT || 5002;
const server = createServer();

server.listen(port, () => {
  log(`country-guesser running on http://localhost:${port}`);
});
