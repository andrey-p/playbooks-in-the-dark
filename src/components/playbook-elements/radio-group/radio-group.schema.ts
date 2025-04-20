import { z } from 'zod';
import { ToggleType } from '@/components/playbook-elements/toggle/toggle.schema';

export const RadioGroupProps = z.object({
  type: ToggleType,
  options: z.array(
    z.object({
      id: z.string().nullable(),
      name: z.string()
    })
  ),
  size: z.number().int().optional(),
  value: z.string().nullable().optional(),
  invertColours: z.boolean().optional()
});
