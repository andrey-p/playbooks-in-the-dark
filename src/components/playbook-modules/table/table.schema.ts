import { z } from 'zod';
import { BaseModuleDefinition, BasePlaybookProps } from '@/schemas';

export const Column = z.object({
  heading: z.string(),
  widthPct: z.number()
});

export const ModuleDefinition = BaseModuleDefinition.merge(
  z.object({
    props: z.object({
      columns: z.array(Column),
      maxRows: z.number().int()
    })
  })
);

export const PlaybookProps = BasePlaybookProps;

export const UserValue = z
  .object({
    values: z.array(z.array(z.string().refine((val) => val.length <= 255)))
  })
  .default({ values: [] });

export default z.object({
  moduleDefinition: ModuleDefinition,
  playbookProps: PlaybookProps,
  userValue: UserValue,
  onUpdate: z.function().args(UserValue).returns(z.void())
});
