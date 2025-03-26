import { z } from 'zod';
import { ToggleType } from '@/components/toggle/toggle.schema';

export const TrackerProps = z.object({
  type: ToggleType.or(z.enum(['clock'])),
  value: z.number().int().default(0),
  max: z.number().int(),
  reverse: z.boolean().optional(),
  variant: z.enum(['linked']).optional(),
  wrap: z.boolean().optional(),
  size: z.number().int().optional()
});
