import { z } from 'zod';

export default z
  .object({
    customLabel: z.string().optional()
  })
  .optional();
