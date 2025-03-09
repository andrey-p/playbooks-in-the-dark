import { z } from "zod";

const SystemProps = z
  .object({
    examples: z.string().array().optional()
  })
  .optional();
const PlaybookProps = z.void();
const Value = z.string();

const schemas = {
  SystemProps,
  PlaybookProps,
  Value
};

export default schemas;
