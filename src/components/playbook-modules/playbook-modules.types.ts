import { z } from "zod";

import type { PlaybookModule } from "@/types";

export type SharedModuleProps<T> = {
  systemModuleData: PlaybookModule;
  value: T;
  onUpdate: (value: T) => void;
};

export type SharedModuleSchemas = {
  SystemProps: z.ZodTypeAny;
  PlaybookProps: z.ZodTypeAny;
  Value: z.ZodTypeAny;
};
