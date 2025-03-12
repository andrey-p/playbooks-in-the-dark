import { z } from 'zod';
import { BaseModuleDefinition } from '../playbook-module.schema';

export const Contact = z.object({
  id: z.string(),
  name: z.string()
});

export const ModuleDefinition = BaseModuleDefinition.and(
  z.object({
    props: z.void()
  })
);
export const PlaybookProps = z.object({
  contacts: z.array(Contact),
  customLabel: z.string().optional()
});
export const UserValue = z.record(
  z.string().refine((val) => val.length <= 255),
  z.number().refine((val) => val >= -1 && val <= 1)
);

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
