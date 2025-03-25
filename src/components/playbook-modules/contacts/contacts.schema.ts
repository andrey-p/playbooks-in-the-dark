import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';

export const Contact = z.object({
  id: z.string(),
  name: z.string()
});

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: z
      .object({
        variant: z.enum(['upDown', 'neutral']).default('upDown')
      })
      .default({})
  })
);
export const PlaybookProps = BasePlaybookProps.and(
  z.object({
    contacts: z.array(Contact)
  })
);
export const UserValue = z
  .object({
    contacts: z.record(
      z.string().refine((val) => val.length <= 255),
      z.number().refine((val) => val >= -1 && val <= 1)
    )
  })
  .default({ contacts: {} });

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
