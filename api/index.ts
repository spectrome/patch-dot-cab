import { NowRequest, NowResponse } from '@vercel/node';
import { getPatch } from '../lib/api';

export default async (request: NowRequest, response: NowResponse) => {
  response.setHeader('Cache-Control', `s-maxage=${1 * 60 * 60 * 24 * 30}`);

  if (request.method !== 'GET') {
    return response.status(400).send('');
  }

  const { url } = request.query as { url: string };

  try {
    const rack = await getPatch(url);
    response.status(200).send(JSON.stringify(rack));
  } catch (error) {
    response.status(422).send(JSON.stringify({ error: error.message }));
  }
};
