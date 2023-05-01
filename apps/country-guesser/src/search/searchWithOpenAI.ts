// import { log } from 'logger';
import { Configuration, OpenAIApi } from 'openai';

export default async function searchWithOpenAi(search: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY');
  }

  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt:
      'Quel est le code ISO 3166-1 alpha-2 de la recherche suivante : ' +
      search +
      ' ?',
    temperature: 0,
    max_tokens: 7,
  });

  const valueFromOpenAi = response.data.choices[0].text;
  // log({ valueFromOpenAi });

  return valueFromOpenAi?.replace(/[^a-zA-Z ]/g, '');
}
