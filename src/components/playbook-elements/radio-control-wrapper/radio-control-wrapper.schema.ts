import { z } from 'zod';

export const LabelOrLabelledBy = z
  .object({ label: z.string() })
  .or(z.object({ labelledBy: z.string() }));
