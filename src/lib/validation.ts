import { z } from 'zod';
import { UserData as UserDataSchema } from '@/schemas';
import { getUnifiedUserValueSchema } from '@/components/playbook-modules/all-schemas';

type UserDataType = z.infer<typeof UserDataSchema>;

const unifiedUserValueSchema = getUnifiedUserValueSchema();

// add that to the usual, more clearly defined properties
const userDataSchema = UserDataSchema.merge(
  z.object({
    modules: z.record(z.string(), unifiedUserValueSchema)
  })
);

export const validateUserData = (userData: UserDataType) => {
  userDataSchema.parse(userData);

  // this is very very basic
  // should try to get representative schema sizes one this is in prod
  if (JSON.stringify(userData).length > 4000) {
    throw new Error('playbook size too large');
  }
};
