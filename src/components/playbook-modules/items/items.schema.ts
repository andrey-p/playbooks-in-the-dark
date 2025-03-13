import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';

export const Item = z.object({
  id: z.string().refine((val) => val.length <= 255),
  name: z.string().refine((val) => val.length <= 255),
  load: z
    .number()
    .int()
    .refine((val) => val >= 0 && val <= 10),
  showLinked: z.boolean().optional()
});

export const ModuleDefinition = BaseModuleDefinition.and(
  z.object({
    props: z.object({
      common: z.array(Item)
    })
  })
);
export const PlaybookProps = BasePlaybookProps.and(
  z
    .object({
      custom: z.array(Item).optional()
    })
    .optional()
);
export const UserValue = z.object({
  load: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || val.length <= 255),
  items: z.record(
    z.string().refine((val) => val.length <= 255),
    z.number().refine((val) => val >= 0 && val <= 10)
  )
});

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
