import { z } from 'zod';

export const ToggleType = z.enum([
  'circle',
  'dagger',
  'rhombus',
  'triangle',
  'square'
]);
export const ToggleProps = z.object({
  type: ToggleType,
  size: z.number().optional(),
  filled: z.boolean().optional(),
  highlighted: z.boolean().optional(),
  invertColours: z.boolean().optional()
});
