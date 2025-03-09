import type { UserData } from "@/types";
import type Action from "./user-data-action";

export default function userDataReducer(state: UserData, action: Action) {
  state = structuredClone(state);

  switch (action.type) {
    case "set_string":
      state[action.key] = action.value;
      break;
    case "set_number":
      state[action.key] = action.value;
      break;
    case "set_string_array":
      state[action.key] = action.value;
      break;
    default:
      throw new Error("unexpected action type: " + action.type);

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
