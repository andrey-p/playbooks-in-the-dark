import { z } from 'zod';
import type { UserData } from '@/types';
import { schemasByModuleType } from '@/components/playbook-modules/all-schemas';

// pull in schemas for all kinds of user value (ie. data that will be saved to DB)
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

// then add in the usual, more clearly defined properties
const userDataSchema = z
  .object({
    id: z.string().max(255),
    systemId: z.string().max(255),
    playbookId: z.string().max(255)
  })
  .and(z.record(z.string(), unifiedUserValueSchema));

export const validateUserData = (userData: UserData) => {
  userDataSchema.parse(userData);

  // this is very very basic
  // should try to get representative schema sizes one this is in prod
  if (JSON.stringify(userData).length > 4000) {
    throw new Error('playbook size too large');
  }
};
