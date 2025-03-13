import { z } from 'zod';
import { UserData as UserDataSchema } from '@/schemas';

import type Action from './user-data-action';
type UserDataType = z.infer<typeof UserDataSchema>;

export default function userDataReducer(state: UserDataType, action: Action) {
  state = structuredClone(state);

  switch (action.type) {
    case 'set_value':
      state[action.key] = action.value;
      break;
    default:
      throw new Error('unexpected action type: ' + action.type);
  }

  return state;
}
