import { useId } from 'react';
import { z } from 'zod';
import styles from './text-area.module.css';
import PropsSchema from './text-area.schema';
import ModuleWrapper from '../layout/module-wrapper';

type Props = z.infer<typeof PropsSchema>;

export default function TextArea(props: Props) {
  const { moduleDefinition, playbookProps, userValue, onUpdate } = props;
  const { text } = userValue;

  const consistentId = useId();

  return (
    <ModuleWrapper moduleDefinition={moduleDefinition} playbookProps={playbookProps}>
      <textarea
        className={styles.input}
        id={consistentId}
        name={consistentId}
        onChange={(e) =>
          onUpdate({
            text: e.currentTarget.value
          })
        }
        value={text}
      />
    </ModuleWrapper>
  );
}

