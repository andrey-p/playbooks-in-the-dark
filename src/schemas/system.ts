import { z } from 'zod';

const System = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  playbookTypes: z.array(z.string())
});

export default System;
