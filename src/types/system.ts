import Item from './item';
import Attribute from './attribute';

type System = {
  id: string,
  name: string,
  characterPlaybooks: string[],
  commonItems: Item[],
  attributes: Attribute[]
};

export default System;
