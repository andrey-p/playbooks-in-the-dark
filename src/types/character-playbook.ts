import type Item from './item';
import type Ratings from './ratings';

type CharacterPlaybook = {
  name: string,
  items: Item[],
  ratings: Ratings
};

export default CharacterPlaybook;
