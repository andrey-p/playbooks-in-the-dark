import { z } from 'zod';
import styles from './slot.module.css';
import { SlotProps as SlotPropsSchema } from './slotted-text.schema';

type SlotPropsType = z.infer<typeof SlotPropsSchema>;

type Props = {
  slot: SlotPropsType;
  value: string;
  onUpdate: (value: string) => void;
};

export default function TextSlot(props: Props) {
  const { slot, value, onUpdate } = props;
  const { label } = slot;

  if (slot.multiline) {
    return (
      <textarea
        className={styles.textArea}
        aria-label={label}
        value={value}
        style={{ height: slot.height }}
        onChange={(e) => onUpdate(e.currentTarget.value)}
      />
    );
  } else {
    return (
      <input
        className={styles.input}
        type='text'
        aria-label={label}
        value={value}
        size={slot.size}
        onChange={(e) => onUpdate(e.currentTarget.value)}
      />
    );
  }
}
