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
    | { text: string }
    | { text: string; column: number; level: number }[]
    | Record<string, number>
    | {
        items: Record<string, number>;
        load?: string | null | undefined;
      }
    | {
        selected: Record<string, number>;
      };
};

export default Action;
