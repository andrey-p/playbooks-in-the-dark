import type ActionRatings from './action-ratings';

type AttributeXp = {
  [key: string]: number
};

type UserCharacterData = {
  name: string,
  actionRatings: ActionRatings,
  attributeXp: AttributeXp,
  selectedItems: string[],
  selectedSpecialAbilities: string[]
};

export default UserCharacterData;
