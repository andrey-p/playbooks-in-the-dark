import type { UserCharacterData } from '@/types';

type Action = {
  type: 'set_action_rating',
  action: string,
  value: number
} | {
  type: 'set_attribute_xp',
  attribute: string,
  value: number
} | {
  type: 'set_item_selected',
  itemId: string,
  selected: boolean
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
    case 'set_item_selected':
      const idx = state.selectedItems.indexOf(action.itemId);

      if (action.selected && idx === -1) {
        state.selectedItems.push(action.itemId);
      } else if (!action.selected && idx > -1) {
        state.selectedItems.splice(idx, 1);
      }

      break;
  }

  return state;
}
