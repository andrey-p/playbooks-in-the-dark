import { z } from 'zod';
import { BaseModuleDefinition } from '../playbook-module.schema';

export const Attribute = z.object({
  id: z.string(),
  name: z.string()
});

export const Action = z.object({
  id: z.string(),
  name: z.string(),
  attributeId: z.string()
});

export const ModuleDefinition = BaseModuleDefinition.and(
  z.object({
    props: z.object({
      attributes: z.array(Attribute),
      actions: z.array(Action)
    })
  })
);
export const PlaybookProps = z.object({
  startingRatings: z.record(z.string(), z.number().int())
});
export const UserValue = z.object({
  actionRatings: z.record(z.string(), z.number().int()),
  attributeXp: z.record(z.string(), z.number().int())
});

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
