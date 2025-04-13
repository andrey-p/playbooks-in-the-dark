import { z } from 'zod';

const System = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  playbookTypes: z.array(z.string()),
  customStyles: z.string().optional(),
  license: z.string().optional(),
  website: z.string().optional()
});

export default System;
