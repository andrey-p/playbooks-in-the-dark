import { z } from 'zod';

const PlaybookData = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  modules: z.record(z.string(), z.unknown())
});

export default PlaybookData;
