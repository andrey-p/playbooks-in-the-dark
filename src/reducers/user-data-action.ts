type Action = {
  type: 'set_value';
  key: string;
  value:
    | string
    | { contacts: Record<string, number> }
    | { values: Record<string, number> }
    | {
        actionRatings: Record<string, number>;
        attributeXp: Record<string, number>;
      }
    | { text: string }
    | { harmsTaken: { text: string; column: number; level: number }[] }
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
