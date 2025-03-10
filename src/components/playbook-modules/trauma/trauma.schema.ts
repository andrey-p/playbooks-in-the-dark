import { z } from 'zod';
import { BaseModuleDefinition } from '../playbook-module.schema';

export const TraumaItem = z.object({
  id: z.string(),
  name: z.string()
});

export const ModuleDefinition = BaseModuleDefinition.and(
  z.object({
    props: z.object({
      options: z.array(TraumaItem)
    })
  })
);
export const PlaybookProps = z.void();
export const UserValue = z.array(z.string());

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
