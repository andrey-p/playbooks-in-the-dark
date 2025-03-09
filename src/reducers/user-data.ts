import type { UserData } from '@/types';
import type Action from './user-data-action';

export default function userDataReducer(state: UserData, action: Action) {
  state = structuredClone(state);

  switch (action.type) {
    case 'set_string':
      state[action.key] = action.value;
      break;
    case 'set_number':
      state[action.key] = action.value;
      break;
    case 'set_string_array':
      state[action.key] = action.value;
      break;
    case 'set_ratings_xp':
      state[action.key] = action.value;
      break;
    default:
      throw new Error('unexpected action type: ' + action.type);
  }

  return state;
}
