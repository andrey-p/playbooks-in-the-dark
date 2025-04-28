import { z } from 'zod';
import {
  UserData as UserDataSchema,
  LocalStorageUserData as LocalStorageUserDataSchema
} from '@/schemas';

const KEY = 'playbooks';

type UserDataType = z.infer<typeof UserDataSchema>;
type LocalStorageUserDataType = z.infer<typeof LocalStorageUserDataSchema>;

export const getPlaybooks = (): LocalStorageUserDataType[] => {
  const storageValue = window.localStorage.getItem(KEY) || '';

  let playbooks: LocalStorageUserDataType[];

  try {
    playbooks = z
      .array(LocalStorageUserDataSchema)
      .parse(JSON.parse(storageValue));
  } catch {
    playbooks = [];
  }

  return playbooks;
};

export const savePlaybook = (data: UserDataType) => {
  // only store the bare minimum in local storage
  const dataToSave = {
    id: data.id,
    systemId: data.systemId,
    playbookType: data.playbookType,
    playbookId: data.playbookId,
    modules: {
      name: data.modules.name
    }
  };

  const playbooks = getPlaybooks();
  const idx = playbooks.findIndex((savedData) => savedData.id === data.id);

  if (idx > -1) {
    playbooks[idx] = dataToSave;
  } else {
    playbooks.push(dataToSave);
  }

  window.localStorage.setItem(KEY, JSON.stringify(playbooks));
};

export const deletePlaybook = (id: string) => {
  const playbooks = getPlaybooks();
  const idx = playbooks.findIndex((savedData) => savedData.id === id);

  if (idx > -1) {
    playbooks.splice(idx, 1);
  }

  window.localStorage.setItem(KEY, JSON.stringify(playbooks));
};
