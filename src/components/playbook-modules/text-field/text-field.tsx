import { useId } from 'react';
import { z } from 'zod';
import styles from './text-field.module.css';
import ExampleList from '@/components/example-list/example-list';
import PropsSchema from './text-field.schema';

type Props = z.infer<typeof PropsSchema>;

export default function TextField(props: Props) {
  const { moduleDefinition, userValue, onUpdate } = props;
  const { props: moduleProps, label } = moduleDefinition;
  const examples = moduleProps?.examples;

  const consistentId = useId();

  return (
    <div className={styles.container}>
      <input
        type='text'
        value={userValue}
        className={styles.input}
        id={consistentId}
        name={consistentId}
        onChange={(e) => onUpdate(e.currentTarget.value)}
      />
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor={consistentId}>
          {label}
        </label>
        {examples && ':'}
        {examples && <ExampleList items={examples} />}
      </div>
    </div>
  );
}
