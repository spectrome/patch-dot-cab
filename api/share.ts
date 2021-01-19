import { NowRequest, NowResponse } from '@vercel/node';
import { savePatch } from '../lib/api';
import type { Rack } from '../lib/types';

export default async (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') {
    return response.status(400).send('');
  }

  const rack = request.body as Rack;

  try {
    const url = await savePatch(rack);
    response.status(200).send(JSON.stringify({ url }));
  } catch (error) {
    console.error(error);
    response.status(422).send(JSON.stringify({ error: error.message }));
  }
};
