// kept separate from all-modules.ts so this file can be loaded by server code

import * as TextFieldSchemas from './text-field/text-field.schema';
import * as TrackerSchemas from './tracker/tracker.schema';
import * as ItemsSchemas from './items/items.schema';
import * as SpecialAbilitiesSchemas from './special-abilities/special-abilities.schema';
import * as RatingsSchemas from './ratings/ratings.schema';
import * as HarmSchemas from './harm/harm.schema';
import * as MultiTrackerSchemas from './multi-tracker/multi-tracker.schema';
import * as ContactsSchemas from './contacts/contacts.schema';

export const schemasByModuleType = {
  textField: TextFieldSchemas,
  tracker: TrackerSchemas,
  items: ItemsSchemas,
  specialAbilities: SpecialAbilitiesSchemas,
  ratings: RatingsSchemas,
  harm: HarmSchemas,
  multiTracker: MultiTrackerSchemas,
  contacts: ContactsSchemas
};
