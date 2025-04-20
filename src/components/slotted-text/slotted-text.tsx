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

// a component that intersperses inline text with inline input fields
// fill-in-the-blanks style
//
// see tests for intended use
export default function SlottedText(props: Props) {
  const { text, slots = [], values = {}, onUpdate } = props;

  // put together components for all slots defined for this bit of text
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

  // separate the text into chunks separated by slot-like tokens e.g.:
  //
  // "hello {foo} bar"
  // ->
  // ["hello ", "{foo}", " bar"]
  //
  // (at this stage it doesn't matter if {foo} is an actual slot -
  // we check that below)
  const splitText = text.split(/(\{[a-zA-Z0-9-]+\})/);

  return (
    <>
      {splitText.map((chunk) => {
        if (slotComponentsById.has(chunk)) {
          return slotComponentsById.get(chunk);
        }

        return chunk;
      })}
    </>
  );
}
