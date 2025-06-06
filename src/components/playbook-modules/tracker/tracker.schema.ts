import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';
import { TrackerProps } from '@/components/playbook-elements/trackers/trackers.schema';

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: TrackerProps
  })
);
export const PlaybookProps = BasePlaybookProps.and(z.void());
export const UserValue = z
  .object({
    value: z
      .number()
      .int()
      .refine((val) => val >= 0 && val <= 255)
  })
  .default({ value: 0 });

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
