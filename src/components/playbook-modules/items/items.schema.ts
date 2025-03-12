import { z } from 'zod';
import { BaseModuleDefinition } from '../playbook-module.schema';

export const Item = z.object({
  id: z.string(),
  name: z.string(),
  load: z.number().int()
});

export const ModuleDefinition = BaseModuleDefinition.and(
  z.object({
    props: z.object({
      common: z.array(Item)
    })
  })
);
export const PlaybookProps = z.array(Item).optional();
export const UserValue = z.object({
  load: z.string().optional().nullable(),
  items: z.array(z.string())
});

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
