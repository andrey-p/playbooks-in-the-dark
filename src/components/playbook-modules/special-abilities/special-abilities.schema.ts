import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';

export const SpecialAbility = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string()
});

export const ModuleDefinition = BaseModuleDefinition.and(
  z.object({
    props: z.void()
  })
);
export const PlaybookProps = BasePlaybookProps.and(
  z.object({
    abilities: z.array(SpecialAbility)
  })
);
export const UserValue = z.array(z.string().refine((val) => val.length <= 255));

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
