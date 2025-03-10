type Action = {
  type: 'set_value';
  key: string;
  value:
    | string
    | number
    | string[]
    | {
        actionRatings: Record<string, number>;
        attributeXp: Record<string, number>;
      }
    | { text: string; column: number; level: number }[];
};

export default Action;
