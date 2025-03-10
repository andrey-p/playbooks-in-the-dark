import { z } from 'zod';
import { BaseModuleDefinition } from '../playbook-module.schema';

export const HarmItem = z.object({
  text: z.string(),
  level: z.number().int(),
  column: z.number().int()
});

export const ModuleDefinition = BaseModuleDefinition.and(
  z.object({
    props: z.object({
      levelDescriptions: z.array(z.string())
    })
  })
);
export const PlaybookProps = z.void();
export const UserValue = z.array(HarmItem);

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
