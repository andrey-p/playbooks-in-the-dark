import { z } from 'zod';

export const SlotProps = z.object({
  id: z.string(),
  size: z.number().int(),
  label: z.string()
});
