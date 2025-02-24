import type ActionRatings from './action-ratings';

type AttributeXp = {
  [key: string]: number
};

type UserCharacterData = {
  actionRatings: ActionRatings,
  attributeXp: AttributeXp
};

export default UserCharacterData;
