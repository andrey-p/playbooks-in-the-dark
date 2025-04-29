import { z } from 'zod';

export const SlotProps = z.object({
  id: z.string(),
  size: z.number().int().optional(),
  height: z.number().int().optional(),
  multiline: z.boolean().optional(),
  label: z.string()
});

export const SlotValue = z.record(
  z.string().refine((val) => val.length <= 255),
  z.string().refine((val) => val.length <= 255)
);
