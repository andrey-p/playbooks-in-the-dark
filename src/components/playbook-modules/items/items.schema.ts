import { z } from "zod";

export const Item = z.object({
  id: z.string(),
  name: z.string(),
  load: z.number().int()
});

const SystemProps = z.object({
  common: z.array(Item)
});
const PlaybookProps = z.array(Item);
const Value = z.array(z.string());

const schemas = {
  SystemProps,
  PlaybookProps,
  Value
};

export default schemas;
