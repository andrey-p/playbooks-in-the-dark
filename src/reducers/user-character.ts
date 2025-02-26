import type { UserCharacterData } from '@/types';

type Action = {
  type: 'set_name',
  value: string
} | {
  type: 'set_heritage',
  value: string
} | {
  type: 'set_stress',
  value: number
} | {
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
} | {
  type: 'set_special_ability_selected',
  specialAbilityId: string,
  selected: boolean
};

const toggleEntry = (id: string, selected: boolean, entries: string[]): string[] => {
  entries = entries.concat();
  const idx = entries.indexOf(id);

  if (selected && idx === -1) {
    entries.push(id);
  } else if (!selected && idx > -1) {
    entries.splice(idx, 1);
  }

  return entries;
};

export default function userCharacterReducer(state: UserCharacterData, action: Action) {
  state = structuredClone(state);

  switch (action.type) {
    case 'set_name':
      state.name = action.value;
      break;
    case 'set_heritage':
      state.heritage = action.value;
      break;
    case 'set_stress':
      state.stress = action.value;
      break;
    case 'set_action_rating':
      state.actionRatings[action.action] = action.value;
      break;
    case 'set_attribute_xp':
      state.attributeXp[action.attribute] = action.value;
      break;
    case 'set_item_selected':
      state.selectedItems = toggleEntry(
        action.itemId,
        action.selected,
        state.selectedItems
      );
      break;
    case 'set_special_ability_selected':
      state.selectedSpecialAbilities = toggleEntry(
        action.specialAbilityId,
        action.selected,
        state.selectedSpecialAbilities
      );
      break;
  }

  return state;
}
