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
      };
};

export default Action;
