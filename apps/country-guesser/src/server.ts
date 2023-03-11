import { json, urlencoded } from 'body-parser';
import express from 'express';
import searchWithOpenAi from './search/searchWithOpenAI';

export const createServer = () => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(urlencoded({ extended: true }))
    .use(json())
    .get('/search/:search', async (req, res) => {
      const search = req.params.search;
      const value = await searchWithOpenAi(search);
      return res.json({ search, value });
    })
    .get('/healthz', (req, res) => {
      return res.json({ ok: true });
    });

  return app;
};
