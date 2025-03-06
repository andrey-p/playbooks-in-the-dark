'use server';

import { Resource } from 'sst';
import { get, put } from './integrations/dynamodb';
import { nanoid } from 'nanoid';

export const getCharacter = async (id: string) => {
  return get(Resource.characters.name, { id });
};

export const saveCharacter = async (data: object) => {
  // TODO validate
  if (!data.id) {
    data.id = nanoid();
  }

  return put(Resource.characters.name, data);
};
