import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';

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

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: z.object({
      levelDescriptions: z.array(z.string())
    })
  })
);
export const PlaybookProps = BasePlaybookProps.and(z.void());
export const UserValue = z.object({
  harmsTaken: z.array(HarmItem)
});

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
