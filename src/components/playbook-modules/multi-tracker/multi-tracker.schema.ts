import { z } from 'zod';
import { BaseModuleDefinition } from '../playbook-module.schema';

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
export const PlaybookProps = z.void();
export const UserValue = z.record(z.string(), z.number());

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
