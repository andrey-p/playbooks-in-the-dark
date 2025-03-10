// kept separate from all-schemas.ts so it can be loaded by server code

import * as TextField from './text-field/text-field';
import * as Tracker from './tracker/tracker';
import * as Items from './items/items';
import * as SpecialAbilities from './special-abilities/special-abilities';
import * as Ratings from './ratings/ratings';
import * as Trauma from './trauma/trauma';
import * as Harm from './harm/harm';

export const componentsByModuleType = {
  textField: TextField,
  tracker: Tracker,
  items: Items,
  specialAbilities: SpecialAbilities,
  ratings: Ratings,
  trauma: Trauma,
  harm: Harm
};
