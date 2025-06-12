import { z } from 'zod';
import PropsSchema from './description.schema';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';
import styles from './description.module.css';

type Props = z.infer<typeof PropsSchema>;

export default function Description(props: Props) {
  const { moduleDefinition, playbookProps } = props;

  // this module simply uses the built-in description functionality
  // in ModuleWrapper in order to display some text
  // - no other inputs or outputs
  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      <div role='presentation' className={styles.empty} />
    </ModuleWrapper>
  );
}
