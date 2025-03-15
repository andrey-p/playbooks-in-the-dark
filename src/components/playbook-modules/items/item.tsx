import { z } from 'zod';
import { Item as ItemSchema } from './items.schema';
import SimpleTracker from '@/components/trackers/simple-tracker';
import styles from './item.module.css';
import clsx from 'clsx';

type Props = {
  item: z.infer<typeof ItemSchema>;
  selected?: number;
  onSelect: (selected: number) => void;
};

export default function Item(props: Props) {
  const { item, selected, onSelect } = props;

  return (
    <div className={styles.container}>
      {/* load 0 items still show a box */}
      <SimpleTracker
        value={selected || 0}
        type='square'
        variant='linked'
        max={item.load || 1}
        onValueSelect={(value: number) => {
          if (value === selected) {
            onSelect(0);
          } else {
            onSelect(value);
          }
        }}
      />
      <span
        className={clsx(styles.itemLabel, item.load === 0 && styles.noLoadItem)}
      >
        {item.name}
      </span>
    </div>
  );
}
