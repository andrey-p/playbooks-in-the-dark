import { z } from 'zod';

export const BaseModuleDefinition = z.object({
  id: z.string(),
  type: z.string(),
  label: z.string(),
  default: z.any(),
  props: z.any(),
  playbooks: z.array(z.string()).optional(),
  description: z.string().optional()
});
