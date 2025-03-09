type Action =
  | {
      type: "set_string";
      key: string;
      value: string;
    }
  | {
      type: "set_number";
      key: string;
      value: number;
    }
  | {
      type: "set_trauma_selected";
      trauma: string;
      selected: boolean;
    }
  | {
      type: "set_action_rating";
      action: string;
      value: number;
    }
  | {
      type: "set_attribute_xp";
      attribute: string;
      value: number;
    }
  | {
      type: "set_item_selected";
      itemId: string;
      selected: boolean;
    }
  | {
      type: "set_special_ability_selected";
      specialAbilityId: string;
      selected: boolean;
    };

export default Action;
