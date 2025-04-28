import { z } from 'zod';
import { Item as ItemSchema } from './items.schema';
import { SlotValue as SlotValueSchema } from '@/components/playbook-elements/slotted-text/slotted-text.schema';
import { TrackerProps as TrackerPropsSchema } from '@/components/playbook-elements/trackers/trackers.schema';
import SimpleTracker from '@/components/playbook-elements/trackers/simple-tracker';
import SlottedText from '@/components/playbook-elements/slotted-text/slotted-text';
import styles from './item.module.css';
import clsx from 'clsx';

type Props = {
  item: z.infer<typeof ItemSchema>;
  selected?: number;
  onSelect: (selected: number) => void;
  slotValues: z.infer<typeof SlotValueSchema>;
  onSlotUpdate: (values: Record<string, string>) => void;
  trackerProps?: z.infer<typeof TrackerPropsSchema>;
};

export default function Item(props: Props) {
  const {
    item,
    selected,
    slotValues,
    trackerProps = {},
    onSelect,
    onSlotUpdate
  } = props;

  // default to showing load 2+ items as linked
  const showLinked =
    typeof item.showLinked === 'boolean' ? item.showLinked : true;

  return (
    <div className={styles.container}>
      {/* load 0 items still show a box */}
      <SimpleTracker
        type='square'
        readOnly={item.readOnly}
        variant={showLinked ? 'linked' : undefined}
        onValueSelect={onSelect}
        {...trackerProps}
        max={item.load || 1}
        value={selected || 0}
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
