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
      type: "set_string_array";
      key: string;
      value: string[];
    }
  | {
      type: "set_ratings_xp";
      key: string;
      value: {
        actionRatings: Record<string, number>;
        attributeXp: Record<string, number>;
      };
    }
  | {
      type: "set_trauma_selected";
      trauma: string;
      selected: boolean;
    };

export default Action;
