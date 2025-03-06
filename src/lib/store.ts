'use server';

import { Resource } from 'sst';
import { get, put } from './integrations/dynamodb';
import { nanoid } from 'nanoid';
import type { UserCharacterData } from '@/types';

export const getCharacter = async (id: string) => {
  const result = await get(Resource.characters.name, { id });

  return result as UserCharacterData;
};

export const saveCharacter = async (data: UserCharacterData) => {
  // TODO validate
  if (!data.id) {
    data.id = nanoid();
  }

  await put(Resource.characters.name, data);

  return getCharacter(data.id);
};
