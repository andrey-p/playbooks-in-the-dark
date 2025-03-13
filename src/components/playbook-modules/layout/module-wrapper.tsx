import { z } from 'zod';
import {
  BaseModuleDefinition as BaseModuleDefinitionSchema,
  BasePlaybookProps as BasePlaybookPropsSchema
} from '@/schemas';

type Props = {
  moduleDefinition: z.infer<typeof BaseModuleDefinitionSchema>;
  playbookProps?: z.infer<typeof BasePlaybookPropsSchema>;
  children: React.ReactNode;
};

export default function ModuleWrapper(props: Props) {
  const { moduleDefinition, playbookProps = {}, children } = props;

  return (
    <div>
      <h3>{playbookProps.customLabel || moduleDefinition.label}</h3>
      {children}
      {moduleDefinition.description && (
        <div
          dangerouslySetInnerHTML={{ __html: moduleDefinition.description }}
        />
      )}
    </div>
  );
}
