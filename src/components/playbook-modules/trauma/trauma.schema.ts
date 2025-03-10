import { z } from 'zod';

export const TraumaItem = z.object({
  id: z.string(),
  name: z.string()
});

const SystemProps = z.object({
  options: z.array(TraumaItem)
});
const PlaybookProps = z.void();
const UserValue = z.array(z.string());

const schemas = {
  SystemProps,
  PlaybookProps,
  UserValue
};

export default schemas;
