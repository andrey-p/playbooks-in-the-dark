import { z } from 'zod';
import { BaseModuleDefinition } from '../playbook-module.schema';

export const HarmItem = z.object({
  text: z.string().refine((val) => val.length <= 255),
  level: z
    .number()
    .int()
    .refine((val) => val >= 0 && val <= 5),
  column: z
    .number()
    .int()
    .refine((val) => val >= 0 && val <= 5)
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
