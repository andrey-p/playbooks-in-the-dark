// kept separate from all-modules.ts so this file can be loaded by server code

import * as TextFieldSchemas from './text-field/text-field.schema';
import * as TrackerSchemas from './tracker/tracker.schema';
import * as ItemsSchemas from './items/items.schema';
import * as SpecialAbilitiesSchemas from './special-abilities/special-abilities.schema';
import * as RatingsSchemas from './ratings/ratings.schema';
import * as TraumaSchemas from './trauma/trauma.schema';

export const schemasByModuleType = {
  textField: TextFieldSchemas,
  tracker: TrackerSchemas,
  items: ItemsSchemas,
  specialAbilities: SpecialAbilitiesSchemas,
  ratings: RatingsSchemas,
  trauma: TraumaSchemas
};
