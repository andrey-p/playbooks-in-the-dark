import { z } from 'zod';
import { UserData as UserDataSchema } from '@/schemas';

import type Action from './user-data-action';
type UserDataType = z.infer<typeof UserDataSchema>;

export default function userDataReducer(state: UserDataType, action: Action) {
  state = structuredClone(state);

  switch (action.type) {
    case 'set_share_id':
      state.shareId = action.value;
      break;
    case 'set_id':
      state.id = action.value;
      break;
    case 'set_value':
      state.modules[action.key] = action.value;
      break;
  }

  return state;
}
