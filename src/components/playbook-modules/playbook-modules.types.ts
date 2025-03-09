import { z } from 'zod';

import { ModuleDefinition } from './playbook-modules.schema';

export type SharedModuleProps<T> = {
  moduleDefinition: z.infer<typeof ModuleDefinition>;
  userValue: T;
  onUpdate: (value: T) => void;
};

export type SharedModuleSchemas = {
  SystemProps: z.ZodTypeAny;
  PlaybookProps: z.ZodTypeAny;
  UserValue: z.ZodTypeAny;
};
