import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';
import { TrackerProps } from '@/components/playbook-elements/trackers/trackers.schema';

export const Attribute = z.object({
  id: z.string(),
  name: z.string(),
  trackerLabel: z.string().optional(),
  description: z.string().optional()
});

export const Action = z.object({
  id: z.string(),
  name: z.string(),
  attributeId: z.string()
});

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: z.object({
      attributes: z.array(Attribute),
      actions: z.array(Action),
      trackerProps: TrackerProps.optional(),
      maxRating: z.number().int().default(4)
    })
  })
);
export const PlaybookProps = BasePlaybookProps.and(
  z.object({
    startingRatings: z.record(z.string(), z.number().int())
  })
);
export const UserValue = z
  .object({
    actionRatings: z.record(
      z.string().refine((val) => val.length <= 255),
      z
        .number()
        .int()
        .refine((val) => val >= 0 && val <= 10)
    ),
    attributeXp: z.record(
      z.string().refine((val) => val.length <= 255),
      z
        .number()
        .int()
        .refine((val) => val >= 0 && val <= 20)
    )
  })
  .default({ actionRatings: {}, attributeXp: {} });

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
