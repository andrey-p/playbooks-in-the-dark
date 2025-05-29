import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';
import { TrackerProps } from '@/components/playbook-elements/trackers/trackers.schema';
import { RadioGroupProps } from '@/components/playbook-elements/radio-group/radio-group.schema';

export const CohortValue = z.object({
  radioGroups: z
    .record(
      z.string().refine((val) => val.length <= 255),
      z
        .string()
        .nullable()
        .refine((val) => !val || val.length <= 255)
    )
    .default({}),
  trackers: z
    .record(
      z.string().refine((val) => val.length <= 255),
      z.number().int()
    )
    .default({}),
  text: z
    .string()
    .refine((val) => val.length <= 1023)
    .default('')
});

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: z.object({
      slots: z.number(),
      trackers: z.record(z.string(), TrackerProps).optional(),
      radioGroups: z.record(z.string(), RadioGroupProps).optional()
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
