import { useId } from 'react';
import styles from './text-field.module.css';
import ExampleList from '@/components/example-list/example-list';

type Props = {
  text: string,
  label: string,
  onTextUpdated: (text: string) => void,
  examples?: string[]
};

export default function TextField(props: Props) {
  const { text, label, onTextUpdated, examples } = props;
  const consistentId = useId();

  return (
    <div className={styles.container}>
      <input
        type='text'
        value={text}
        className={styles.input}
        id={consistentId}
        name={consistentId}
        onChange={(e) => onTextUpdated(e.currentTarget.value)}
      />
      <div className={styles.labelContainer}>
        <label
          className={styles.label}
          htmlFor={consistentId}
        >
          {label}
          {examples && ':'}
        </label>

        {examples && (
          <ExampleList
            items={examples}
          />
        )}
      </div>
    </div>
  );
}
