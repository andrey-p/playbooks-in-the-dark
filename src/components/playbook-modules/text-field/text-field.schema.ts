import { z } from 'zod';
import { BaseModuleDefinition } from '../playbook-module.schema';

export const ModuleDefinition = BaseModuleDefinition.and(
  z.object({
    props: z
      .object({
        examples: z.string().array().optional()
      })
      .optional()
  })
);

export const PlaybookProps = z.void();
export const UserValue = z.string().refine((val) => val.length <= 255);

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
