import searchWithOpenAi from '../../search/searchWithOpenAI';

describe('searchWithOpenAI', () => {
  it('find FR', async () => {
    await expect(await searchWithOpenAi('France')).toEqual('FR');
  });
  it('find IT', async () => {
    await expect(await searchWithOpenAi('Rome')).toEqual('IT');
  });
});
