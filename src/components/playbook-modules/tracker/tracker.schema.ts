import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';

export const ModuleDefinition = BaseModuleDefinition.and(
  z.object({
    props: z.object({
      trackerType: z.enum(['dagger', 'circle', 'square', 'clock']),
      max: z.number()
    })
  })
);
export const PlaybookProps = BasePlaybookProps.and(z.void());
export const UserValue = z
  .number()
  .int()
  .refine((val) => val >= 0 && val <= 255);

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
