import { z } from "zod";

import { ModuleDefinition } from "./playbook-modules.schema";

export type SharedModuleProps<T> = {
  moduleDefinition: z.infer<typeof ModuleDefinition>;
  value: T;
  onUpdate: (value: T) => void;
};

export type SharedModuleSchemas = {
  SystemProps: z.ZodTypeAny;
  PlaybookProps: z.ZodTypeAny;
  Value: z.ZodTypeAny;
};
