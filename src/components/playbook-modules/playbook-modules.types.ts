import { z } from "zod";

import { SystemModuleData } from "./playbook-modules.schema";

export type SharedModuleProps<T> = {
  systemModuleData: z.infer<typeof SystemModuleData>;
  value: T;
  onUpdate: (value: T) => void;
};

export type SharedModuleSchemas = {
  SystemProps: z.ZodTypeAny;
  PlaybookProps: z.ZodTypeAny;
  Value: z.ZodTypeAny;
};
