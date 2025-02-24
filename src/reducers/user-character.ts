import type { UserCharacterData } from '@/types';

type Action = {
  type: 'set_action_rating',
  action: string,
  value: number
} | {
  type: 'set_attribute_xp',
  attribute: string,
  value: number
};

export default function userCharacterReducer(state: UserCharacterData, action: Action) {
  state = structuredClone(state);

  switch (action.type) {
    case 'set_action_rating':
      state.actionRatings[action.action] = action.value;
      break;
    case 'set_attribute_xp':
      state.attributeXp[action.attribute] = action.value;
      break;
  }

  return state;
}
