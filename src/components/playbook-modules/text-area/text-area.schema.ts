import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: z
      .object({
        examples: z.string().array().optional(),
        height: z.number().int().default(300)
      })
      .optional()
  })
);

export const PlaybookProps = BasePlaybookProps.and(
  z
    .object({
      examples: z.string().array().optional()
    })
    .optional()
);

export const UserValue = z
  .object({
    // 3k characters should be enough for anyone right?
    text: z.string().refine((val) => val.length <= 3000)
  })
  .default({ text: '' });

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
