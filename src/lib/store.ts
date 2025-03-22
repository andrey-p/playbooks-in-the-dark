'use server';

import { z } from 'zod';
import { Resource } from 'sst';
import { get, put, deleteItem } from './integrations/dynamodb';
import { nanoid } from 'nanoid';
import { UserData as UserDataSchema } from '@/schemas';
import { validateUserData } from './validation';

type UserDataType = z.infer<typeof UserDataSchema>;

export const getPlaybook = async (id: string) => {
  const result = await get(Resource.playbookTable.name, { id });

  return UserDataSchema.parse(result);
};

export const savePlaybook = async (data: UserDataType) => {
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

export const deletePlaybook = async (id: string) => {
  await deleteItem(Resource.playbookTable.name, { id });
};
