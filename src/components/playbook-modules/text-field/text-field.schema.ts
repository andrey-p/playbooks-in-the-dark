import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: z
      .object({
        examples: z.string().array().optional()
      })
      .optional()
  })
);

export const PlaybookProps = BasePlaybookProps.and(z.void());
export const UserValue = z
  .object({
    text: z.string().refine((val) => val.length <= 255)
  })
  .default({ text: '' });

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
