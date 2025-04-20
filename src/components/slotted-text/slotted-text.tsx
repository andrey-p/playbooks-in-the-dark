import { useCallback } from 'react';
import { z } from 'zod';
import {
  SlotProps as SlotPropsSchema,
  SlotValue as SlotValueSchema
} from './slotted-text.schema';
import Slot from './slot';

type SlotPropsType = z.infer<typeof SlotPropsSchema>;
type SlotValueType = z.infer<typeof SlotValueSchema>;

type Props = {
  text: string;
  slots?: SlotPropsType[];
  values?: SlotValueType;
  onUpdate: (values: Record<string, string>) => void;
};

export default function SlottedText(props: Props) {
  const { text, slots = [], values = {}, onUpdate } = props;

  const slotComponentsById = new Map<string, React.ReactNode>();

  const onSlotUpdate = useCallback(
    (key: string, value: string) => {
      onUpdate({
        ...values,
        [key]: value
      });
    },
    [onUpdate, values]
  );

  slots.forEach((slot) => {
    slotComponentsById.set(
      `{${slot.id}}`,
      <Slot
        key={slot.id}
        slot={slot}
        value={values[slot.id] || ''}
        onUpdate={(value) => onSlotUpdate(slot.id, value)}
      />
    );
  });

  const splitText = text.split(/(\{[a-zA-Z0-9-]+\})/);

  return (
    <span>
      {splitText.map((chunk) => {
        if (slotComponentsById.has(chunk)) {
          return slotComponentsById.get(chunk);
        }

        return chunk;
      })}
    </span>
  );
}
