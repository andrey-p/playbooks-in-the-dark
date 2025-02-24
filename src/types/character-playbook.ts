import type Item from './item';
import type ActionRatings from './action-ratings';
import type SpecialAbility from './special-ability';

type CharacterPlaybook = {
  id: string,
  items: Item[],
  actionRatings: ActionRatings,
  specialAbilities: SpecialAbility[]
};

export default CharacterPlaybook;
