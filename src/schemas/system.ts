import { z } from 'zod';

const System = z.object({
  id: z.string(),
  name: z.string(),
  translationNamespace: z.string(),
  description: z.string(),
  playbookTypes: z.array(z.string()),
  customStyles: z.string().optional(),
  license: z.string().optional(),
  attribution: z.string().optional(),
  website: z.string().optional()
});

export default System;
