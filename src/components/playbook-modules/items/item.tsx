import { z } from 'zod';
import { Item as ItemSchema } from './items.schema';
import SimpleTracker from '@/components/trackers/simple-tracker';
import SlottedText from '@/components/slotted-text/slotted-text';
import styles from './item.module.css';
import clsx from 'clsx';

type Props = {
  item: z.infer<typeof ItemSchema>;
  selected?: number;
  onSelect: (selected: number) => void;
  slotValues: Record<string, string>;
  onSlotUpdate: (values: Record<string, string>) => void;
};

export default function Item(props: Props) {
  const { item, selected, slotValues, onSelect, onSlotUpdate } = props;

  // default to showing load 2+ items as linked
  const showLinked =
    typeof item.showLinked === 'boolean' ? item.showLinked : true;

  return (
    <div className={styles.container}>
      {/* load 0 items still show a box */}
      <SimpleTracker
        value={selected || 0}
        type='square'
        variant={showLinked ? 'linked' : undefined}
        max={item.load || 1}
        onValueSelect={onSelect}
      />
      <span
        className={clsx(styles.itemLabel, item.load === 0 && styles.noLoadItem)}
      >
        <SlottedText
          text={item.name}
          slots={item.slots}
          values={slotValues}
          onUpdate={onSlotUpdate}
        />
      </span>
    </div>
  );
}
