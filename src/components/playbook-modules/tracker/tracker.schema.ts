import { z } from "zod";

const SystemProps = z.object({
  trackerType: z.enum(["dagger", "circle", "square"]),
  max: z.number()
});
const PlaybookProps = z.void();
const Value = z.number().int();

const schemas = {
  SystemProps,
  PlaybookProps,
  Value
};

export default schemas;
