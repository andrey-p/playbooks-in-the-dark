import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';
import { RadioGroupProps } from '@/components/playbook-elements/radio-group/radio-group.schema';

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: RadioGroupProps
  })
);

export const PlaybookProps = BasePlaybookProps.and(z.void());
export const UserValue = z
  .object({
    value: z
      .string()
      .nullable()
      .refine((val) => !val || val.length <= 255)
  })
  .default({ value: null });

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
