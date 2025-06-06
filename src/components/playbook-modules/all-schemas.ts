// kept separate from all-modules.ts so this file can be loaded by server code
import { z } from 'zod';

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
import * as CohortsSchemas from './cohorts/cohorts.schema';
import * as DescriptionSchemas from './description/description.schema';
import * as TableSchemas from './table/table.schema';

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
  claims: ClaimsSchemas,
  cohorts: CohortsSchemas,
  description: DescriptionSchemas,
  table: TableSchemas
};

export const getUnifiedUserValueSchema = () => {
  // pull in schemas for all kinds of user value (e.g. data that will be saved to the DB)
  // and create a big zod schema that checks for all of them
  const userValueSchemas = Object.values(schemasByModuleType).map(
    (schemas) => schemas.UserValue
  );
  const unifiedUserValueSchema = userValueSchemas.reduce(
    (acc: z.ZodTypeAny, val: z.ZodTypeAny) => {
      return acc.or(val);
    },
    z.void()
  );

  return unifiedUserValueSchema;
};
