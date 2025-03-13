import { z } from 'zod';

const PlaybookData = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string()
  })
  .and(z.record(z.string(), z.unknown()));

export default PlaybookData;
