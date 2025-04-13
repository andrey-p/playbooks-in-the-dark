'use server';

import { z } from 'zod';
import { GetItemCommand } from 'dynamodb-toolbox/entity/actions/get';
import { PutItemCommand } from 'dynamodb-toolbox/entity/actions/put';
import { DeleteItemCommand } from 'dynamodb-toolbox/entity/actions/delete';
import { UserData } from './dynamodb';
import { nanoid } from 'nanoid';
import { UserData as UserDataSchema } from '@/schemas';
import { validateUserData } from './validation';

type UserDataType = z.infer<typeof UserDataSchema>;

export const getPlaybook = async (id: string) => {
  const command = UserData.build(GetItemCommand).key({ id });
  const { Item: result } = await command.send();

  return UserDataSchema.parse(result);
};

export const savePlaybook = async (data: UserDataType) => {
  const id = data.id || nanoid();
  const shareId = data.id || nanoid();

  try {
    validateUserData(data);
  } catch {
    throw new Error("Couldn't save playbook");
  }

  const command = UserData.build(PutItemCommand).item({
    ...data,
    id,
    shareId
  });
  await command.send();

  return getPlaybook(id);
};

export const deletePlaybook = async (id: string) => {
  const command = UserData.build(DeleteItemCommand).key({ id });
  return command.send();
};
