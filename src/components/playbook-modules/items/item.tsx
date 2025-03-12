import { z } from 'zod';
import { Item as ItemSchema } from './items.schema';
import SimpleTracker from '@/components/trackers/simple-tracker';
import styles from './item.module.css';

type Props = {
  item: z.infer<typeof ItemSchema>;
  selected?: number;
  onSelect: (selected: number) => void;
};

export default function Item(props: Props) {
  const { item, selected, onSelect } = props;

  return (
    <div className={styles.container}>
      <SimpleTracker
        value={selected || 0}
        type='square'
        max={item.load}
        onValueSelect={(value: number) => {
          if (value === selected) {
            onSelect(0);
          } else {
            onSelect(value);
          }
        }}
      />
      <span className={item.load === 0 ? styles.noLoadItem : ''}>
        {item.id}
      </span>
    </div>
  );
}
