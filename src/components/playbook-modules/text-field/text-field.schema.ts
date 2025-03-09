import { z } from 'zod';

const SystemProps = z
  .object({
    examples: z.string().array().optional()
  })
  .optional();
const PlaybookProps = z.void();
const UserValue = z.string();

const schemas = {
  SystemProps,
  PlaybookProps,
  UserValue
};

export default schemas;
