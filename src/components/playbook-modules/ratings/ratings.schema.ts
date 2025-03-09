import { z } from "zod";

export const Attribute = z.object({
  id: z.string(),
  name: z.string()
});

export const Action = z.object({
  id: z.string(),
  name: z.string(),
  attributeId: z.string()
});

const SystemProps = z.object({
  attributes: z.array(Attribute),
  actions: z.array(Action)
});
const PlaybookProps = z.record(z.string(), z.number().int());
const UserValue = z.object({
  actionRatings: z.record(z.string(), z.number().int()),
  attributeXp: z.record(z.string(), z.number().int())
});

const schemas = {
  SystemProps,
  PlaybookProps,
  UserValue
};

export default schemas;
