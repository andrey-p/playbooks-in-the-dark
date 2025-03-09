import { z } from 'zod';

export const SpecialAbility = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string()
});

const SystemProps = z.void();
const PlaybookProps = z.array(SpecialAbility);
const UserValue = z.array(z.string());

const schemas = {
  SystemProps,
  PlaybookProps,
  UserValue
};

export default schemas;
