import supertest from 'supertest';
import { createServer } from '../server';

describe('server', () => {
  it('health check returns 200', async () => {
    await supertest(createServer())
      .get('/healthz')
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true);
      });
  });
  it('search a country from a name', async () => {
    await supertest(createServer())
      .get('/search/france')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ search: 'france', value: 'FR' });
      });
  });
});
