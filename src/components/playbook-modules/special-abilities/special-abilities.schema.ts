import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';

export const SpecialAbility = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  max: z.number().optional()
});

export const ModuleDefinition = BaseModuleDefinition.and(
  z.object({
    props: z.void()
  })
);
export const PlaybookProps = BasePlaybookProps.and(
  z.object({
    abilities: z.array(SpecialAbility)
  })
);
export const UserValue = z
  .object({
    selected: z.record(
      z.string().refine((val) => val.length <= 255),
      z
        .number()
        .int()
        .refine((val) => val >= 0 && val < 10)
    )
  })
  .default({ selected: {} });

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
