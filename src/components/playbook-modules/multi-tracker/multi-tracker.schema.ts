import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';
import { TrackerProps } from '@/components/playbook-elements/trackers/trackers.schema';

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: z.object({
      trackers: z.record(z.string(), TrackerProps)
    })
  })
);
export const PlaybookProps = BasePlaybookProps.and(z.void());
export const UserValue = z
  .object({
    values: z.record(
      z.string().refine((val) => val.length < 255),
      z.number().refine((val) => val >= 0 && val <= 255)
    )
  })
  .default({ values: {} });

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
