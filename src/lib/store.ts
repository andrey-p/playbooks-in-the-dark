import { Resource } from 'sst';
import { get, put } from './integrations/dynamodb';

export const getCharacter = (id: string) => {
  return get(Resource.characters.name, { id });
};

export const saveCharacter = (data: object) => {
  return put(Resource.characters.name, data);
};
