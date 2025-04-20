import { useId } from 'react';
import { z } from 'zod';
import styles from './text-area.module.css';
import PropsSchema from './text-area.schema';
import ExampleList from '@/components/example-list/example-list';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';

type Props = z.infer<typeof PropsSchema>;

export default function TextArea(props: Props) {
  const { moduleDefinition, playbookProps, userValue, onUpdate } = props;
  const { props: moduleProps } = moduleDefinition;
  const examples = moduleProps?.examples || playbookProps?.examples;
  const { text } = userValue;

  const consistentId = useId();

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      <textarea
        className={styles.input}
        style={{ height: moduleProps?.height }}
        id={consistentId}
        name={consistentId}
        onChange={(e) =>
          onUpdate({
            text: e.currentTarget.value
          })
        }
        value={text}
      />
      {examples && <ExampleList items={examples} />}
    </ModuleWrapper>
  );
}
