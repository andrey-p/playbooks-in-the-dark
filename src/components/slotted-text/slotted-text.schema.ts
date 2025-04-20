import { z } from 'zod';

export const SlotProps = z.object({
  id: z.string(),
  length: z.number().int(),
  label: z.string()
});
