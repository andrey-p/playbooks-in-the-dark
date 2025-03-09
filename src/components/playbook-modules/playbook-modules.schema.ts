import { z } from "zod";

export const SystemModuleData = z.object({
  id: z.string(),
  type: z.string(),
  label: z.string(),
  props: z.object({}).optional()
});
