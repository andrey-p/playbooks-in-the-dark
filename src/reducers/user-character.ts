import type { UserCharacterData } from "@/types";
import type Action from "./user-character-action";

const toggleEntry = (
  id: string,
  selected: boolean,
  entries: string[]
): string[] => {
  entries = entries.concat();
  const idx = entries.indexOf(id);

  if (selected && idx === -1) {
    entries.push(id);
  } else if (!selected && idx > -1) {
    entries.splice(idx, 1);
  }

  return entries;
};

export default function userCharacterReducer(
  state: UserCharacterData,
  action: Action
) {
  state = structuredClone(state);

  switch (action.type) {
    case "set_string":
      state[action.key] = action.value;
      break;
    case "set_stress":
      state.stress = action.value;
      break;
    // case "set_action_rating":
    //   state.actionRatings[action.action] = action.value;
    //   break;
    // case "set_attribute_xp":
    //   state.attributeXp[action.attribute] = action.value;
    //   break;
    // case "set_trauma_selected":
    //   state.traumas = toggleEntry(
    //     action.trauma,
    //     action.selected,
    //     state.traumas
    //   );
    //   break;
    // case "set_item_selected":
    //   state.selectedItems = toggleEntry(
    //     action.itemId,
    //     action.selected,
    //     state.selectedItems
    //   );
    //   break;
    // case "set_special_ability_selected":
    //   state.selectedSpecialAbilities = toggleEntry(
    //     action.specialAbilityId,
    //     action.selected,
    //     state.selectedSpecialAbilities
    //   );
    //   break;
  }

  return state;
}
