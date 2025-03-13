import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';

export const ModuleDefinition = BaseModuleDefinition.and(
  z.object({
    props: z.object({
      trackers: z.record(
        z.string(),
        z.object({
          trackerType: z.enum(['dagger', 'circle', 'square']),
          max: z.number()
        })
      )
    })
  })
);
export const PlaybookProps = BasePlaybookProps.and(z.void());
export const UserValue = z.record(
  z.string().refine((val) => val.length < 255),
  z.number().refine((val) => val >= 0 && val <= 255)
);

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
