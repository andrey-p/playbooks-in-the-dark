import { z } from 'zod';

export const Item = z.object({
  id: z.string(),
  name: z.string(),
  load: z.number().int()
});

const SystemProps = z.object({
  common: z.array(Item)
});
const PlaybookProps = z.array(Item);
const UserValue = z.array(z.string());

const schemas = {
  SystemProps,
  PlaybookProps,
  UserValue
};

export default schemas;
