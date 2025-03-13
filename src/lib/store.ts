'use server';

import { Resource } from 'sst';
import { get, put } from './integrations/dynamodb';
import { nanoid } from 'nanoid';
import type { UserData } from '@/types';
import { validateUserData } from './validation';

export const getPlaybook = async (id: string) => {
  const result = await get(Resource.playbookTable.name, { id });

  return result as UserData;
};

export const savePlaybook = async (data: UserData) => {
  if (!data.id) {
    data.id = nanoid();
  }

  try {
    validateUserData(data);
  } catch {
    throw new Error("Couldn't save playbook");
  }

  await put(Resource.playbookTable.name, data);

  return getPlaybook(data.id);
};
