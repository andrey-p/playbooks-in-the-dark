import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';
import { RadioGroupProps } from '@/components/radio-group/radio-group.schema';

export const CohortValue = z.object({
  radioGroups: z.record(
    z.string().refine((val) => val.length <= 255),
    z
      .string()
      .nullable()
      .refine((val) => !val || val.length <= 255)
  ),
  text: z.string().refine((val) => val.length <= 1023)
});

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: z.object({
      slots: z.number(),
      radioGroups: z.record(z.string(), RadioGroupProps)
    })
  })
);

export const PlaybookProps = BasePlaybookProps.and(
  z
    .object({
      startingCohorts: z.array(CohortValue).optional()
    })
    .optional()
);

export const UserValue = z
  .object({
    cohorts: z.array(CohortValue)
  })
  .default({ cohorts: [] });

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
