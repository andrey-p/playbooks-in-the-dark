import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';
import { TrackerProps } from '@/components/playbook-elements/trackers/trackers.schema';
import {
  SlotProps,
  SlotValue
} from '@/components/playbook-elements/slotted-text/slotted-text.schema';

export const Item = z.object({
  id: z.string().refine((val) => val.length <= 255),
  name: z.string().refine((val) => val.length <= 255),
  load: z
    .number()
    .int()
    .refine((val) => val >= 0 && val <= 10),
  showLinked: z.boolean().optional(),
  group: z.string().optional(),
  slots: z.array(SlotProps).optional(),
  readOnly: z.boolean().optional(),
  trackerProps: TrackerProps.optional()
});

export const Group = z.object({
  id: z
    .string()
    .refine((val) => val.length <= 255)
    .optional(),
  name: z.string().refine((val) => val.length <= 255),
  description: z
    .string()
    .refine((val) => val.length <= 1024)
    .optional()
});

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: z.object({
      twoColumns: z.boolean().optional(),
      load: z
        .array(
          z.object({
            id: z.string(),
            name: z.string()
          })
        )
        .optional(),
      groups: z.array(Group).optional(),
      common: z.array(Item),
      trackerProps: TrackerProps.optional()
    })
  })
);
export const PlaybookProps = BasePlaybookProps.and(
  z
    .object({
      custom: z.array(Item).optional(),
      groups: z.array(Group).optional(),
      startingItems: z.record(z.string(), z.number()).optional()
    })
    .optional()
);
export const UserValue = z
  .object({
    load: z
      .string()
      .optional()
      .nullable()
      .refine((val) => !val || val.length <= 255),
    items: z.record(
      z.string().refine((val) => val.length <= 255),
      z.number().refine((val) => val >= 0 && val <= 10)
    ),
    slots: SlotValue.optional()
  })
  .default({ items: {} });

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
