import { useId } from 'react';
import styles from './text-field.module.css';

type Props = {
  text: string,
  label: string,
  onTextUpdated: (text: string) => void
};

export default function TextField(props: Props) {
  const { text, label, onTextUpdated } = props;
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
      <label
        className={styles.label}
        htmlFor={consistentId}
      >{label}</label>
    </div>
  );
}
