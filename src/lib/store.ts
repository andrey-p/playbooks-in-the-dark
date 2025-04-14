'use server';

import { z } from 'zod';
import { GetItemCommand } from 'dynamodb-toolbox/entity/actions/get';
import { PutItemCommand } from 'dynamodb-toolbox/entity/actions/put';
import { DeleteItemCommand } from 'dynamodb-toolbox/entity/actions/delete';
import { QueryCommand } from 'dynamodb-toolbox/table/actions/query';
import { UserData } from './dynamodb';
import { nanoid } from 'nanoid';
import { UserData as UserDataSchema } from '@/schemas';
import { validateUserData } from './validation';

type UserDataType = z.infer<typeof UserDataSchema>;

export const getPlaybook = async (id: string) => {
  const command = UserData.Entity.build(GetItemCommand).key({ id });
  const { Item: result } = await command.send();

  return UserDataSchema.parse(result);
};

export const getPlaybookByShareId = async (shareId: string) => {
  const command = UserData.Table.build(QueryCommand).query({
    partition: shareId,
    index: 'shareIndex'
  });
  const { Items: result } = await command.send();

  if (!result || !result.length) {
    return null;
  }

  return UserDataSchema.parse(result[0]);
};

export const savePlaybook = async (data: UserDataType) => {
  const id = data.id || nanoid();
  const shareId = data.shareId || nanoid();

  try {
    validateUserData(data);
  } catch {
    throw new Error("Couldn't save playbook");
  }

  const command = UserData.Entity.build(PutItemCommand).item({
    ...data,
    id,
    shareId
  });
  await command.send();

  return getPlaybook(id);
};

export const deletePlaybook = async (id: string) => {
  const command = UserData.Entity.build(DeleteItemCommand).key({ id });
  return command.send();
};
