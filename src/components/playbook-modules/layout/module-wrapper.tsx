import { z } from 'zod';
import {
  BaseModuleDefinition as BaseModuleDefinitionSchema,
  BasePlaybookProps as BasePlaybookPropsSchema
} from '@/schemas';
import styles from './module-wrapper.module.css';
import clsx from 'clsx';

type Props = {
  moduleDefinition: z.infer<typeof BaseModuleDefinitionSchema>;
  playbookProps?: z.infer<typeof BasePlaybookPropsSchema>;
  children: React.ReactNode;
};

export default function ModuleWrapper(props: Props) {
  const { moduleDefinition, playbookProps = {}, children } = props;

  return (
    <div
      className={clsx(
        styles.container,
        // add the ID and type of the module to use as a styling hook
        moduleDefinition.id,
        moduleDefinition.type
      )}
    >
      <h2 className={styles.heading}>
        {playbookProps.customLabel || moduleDefinition.label}
      </h2>
      {children}
      {moduleDefinition.description && (
        <div
          dangerouslySetInnerHTML={{ __html: moduleDefinition.description }}
        />
      )}
    </div>
  );
}
