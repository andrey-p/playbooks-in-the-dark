// kept separate from all-modules.ts so this file can be loaded by server code

import * as TextFieldSchemas from './text-field/text-field.schema';
import * as TextAreaSchemas from './text-area/text-area.schema';
import * as TrackerSchemas from './tracker/tracker.schema';
import * as RadioGroupSchemas from './radio-group/radio-group.schema';
import * as ItemsSchemas from './items/items.schema';
import * as SpecialAbilitiesSchemas from './special-abilities/special-abilities.schema';
import * as RatingsSchemas from './ratings/ratings.schema';
import * as HarmSchemas from './harm/harm.schema';
import * as MultiTrackerSchemas from './multi-tracker/multi-tracker.schema';
import * as ContactsSchemas from './contacts/contacts.schema';
import * as ClaimsSchemas from './claims/claims.schema';

export const schemasByModuleType = {
  textField: TextFieldSchemas,
  textArea: TextAreaSchemas,
  tracker: TrackerSchemas,
  radioGroup: RadioGroupSchemas,
  items: ItemsSchemas,
  specialAbilities: SpecialAbilitiesSchemas,
  ratings: RatingsSchemas,
  harm: HarmSchemas,
  multiTracker: MultiTrackerSchemas,
  contacts: ContactsSchemas,
  claims: ClaimsSchemas
};
