// kept separate from all-schemas.ts so it can be loaded by server code

import * as TextField from './text-field/text-field';
import * as TextArea from './text-area/text-area';
import * as Tracker from './tracker/tracker';
import * as RadioGroup from './radio-group/radio-group';
import * as Items from './items/items';
import * as SpecialAbilities from './special-abilities/special-abilities';
import * as Ratings from './ratings/ratings';
import * as Harm from './harm/harm';
import * as MultiTracker from './multi-tracker/multi-tracker';
import * as Contacts from './contacts/contacts';
import * as Claims from './claims/claims';
import * as Cohorts from './cohorts/cohorts';

export const componentsByModuleType = {
  textField: TextField,
  tracker: Tracker,
  radioGroup: RadioGroup,
  items: Items,
  specialAbilities: SpecialAbilities,
  ratings: Ratings,
  harm: Harm,
  multiTracker: MultiTracker,
  contacts: Contacts,
  claims: Claims,
  cohorts: Cohorts,
  textArea: TextArea
};
