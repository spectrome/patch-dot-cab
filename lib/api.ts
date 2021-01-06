import { create } from 'apisauce';
import type { LibraryItem } from '@patchcab/core/lib/types';
import type { Rack } from './types';
import validatePatch from './validatePatch';

const api = create({
  baseURL: `https://${process.env.PATCHCAB_DB_URL}.restdb.io/rest`,
  headers: {
    'Content-Type': 'application/json',
    'x-apikey': process.env.PATCHCAB_DB_KEY,
  },
});

const randomID = (): string => {
  return Math.random().toString(36).substr(2, 8);
};

const savePatch = async (
  title: string,
  rack: Rack,
  library: LibraryItem[]
): Promise<string> => {
  const valid = validatePatch(rack, library);

  if (!valid) {
    throw Error('Invalid rack');
  }

  let url = randomID();
  let unique = false;

  while (!unique) {
    const response = await api.get<Rack[]>(`/patches?q=${JSON.stringify({ url })}`);

    if (!response.ok) {
      throw Error('Internal error');
    }

    if (response.data.length === 0) {
      unique = true;
    } else {
      url = randomID();
    }

    unique = true;
  }

  const insert = await api.post<Rack>(`/patches`, {
    title,
    url,
    rack,
  });

  if (!insert.ok) {
    throw Error('Internal error');
  }

  return insert.data.url;
};

const getPatch = async (url: string): Promise<Rack> => {
  const response = await api.get<Rack[]>(`/patches?q=${JSON.stringify({ url })}`);

  if (!response.ok) {
    throw Error('Internal error');
  }

  if (response.data.length !== 1) {
    throw Error('Patch not found');
  }

  const rack = response.data[0];

  delete rack._id;

  return rack;
};

export { savePatch, getPatch };
