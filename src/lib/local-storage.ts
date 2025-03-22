import { z } from 'zod';
import {
  UserData as UserDataSchema,
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  LocalStorageUserData as LocalStorageUserDataSchema
} from '@/schemas';

const KEY = 'playbooks';

type UserDataType = z.infer<typeof UserDataSchema>;
type LocalStorageUserDataType = z.infer<typeof LocalStorageUserDataSchema>;
type PlaybookDefinitionType = z.infer<typeof PlaybookDefinitionSchema>;
type PlaybookDataType = z.infer<typeof PlaybookDataSchema>;

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

export const savePlaybook = (
  data: UserDataType,
  playbookData: PlaybookDataType,
  playbookDefinition: PlaybookDefinitionType
) => {
  // only store the bare minimum in local storage
  const dataToSave = {
    id: data.id,
    systemId: data.systemId,
    playbookType: data.playbookType,
    playbookId: data.playbookId,
    // if there's a name to the character, store that as well
    // so we've got something to show
    name: data.modules.name?.text
      ? data.modules.name.text
      : `An unnamed ${playbookDefinition.name}`,
    description: playbookData.name
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
