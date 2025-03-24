import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';

export const Claim = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  connections: z.array(z.enum(['down', 'right'])).optional(),
  selectable: z.boolean().default(true)
});

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: z.void()
  })
);

export const PlaybookProps = BasePlaybookProps.and(
  z.object({
    claims: z.array(z.array(Claim))
  })
);

export const UserValue = z
  .object({
    selected: z.record(
      z.string().refine((val) => val.length <= 255),
      z.boolean()
    )
  })
  .default({ selected: {} });

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
