import type Item from './item';
import type ActionRatings from './action-ratings';

type CharacterPlaybook = {
  name: string,
  items: Item[],
  actionRatings: ActionRatings
};

export default CharacterPlaybook;
