import { z } from 'zod';

import * as TextFieldSchemas from './text-field/text-field.schema';
import * as TextField from './text-field/text-field';
import * as TrackerSchemas from './tracker/tracker.schema';
import * as Tracker from './tracker/tracker';
import * as ItemsSchemas from './items/items.schema';
import * as Items from './items/items';
import * as SpecialAbilitiesSchemas from './special-abilities/special-abilities.schema';
import * as SpecialAbilities from './special-abilities/special-abilities';
import * as RatingsSchemas from './ratings/ratings.schema';
import * as Ratings from './ratings/ratings';
import * as TraumaSchemas from './trauma/trauma.schema';
import * as Trauma from './trauma/trauma';

export const schemasByModuleType = {
  textField: TextFieldSchemas,
  tracker: TrackerSchemas,
  items: ItemsSchemas,
  specialAbilities: SpecialAbilitiesSchemas,
  ratings: RatingsSchemas,
  trauma: TraumaSchemas
};

export const componentsByModuleType = {
  textField: TextField,
  tracker: Tracker,
  items: Items,
  specialAbilities: SpecialAbilities,
  ratings: Ratings,
  trauma: Trauma
};
