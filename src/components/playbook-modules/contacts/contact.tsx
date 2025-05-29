import { z } from 'zod';
import { useState, useId } from 'react';
import { Contact as ContactSchema } from './contacts.schema';
import { SlotValue as SlotValueSchema } from '@/components/playbook-elements/slotted-text/slotted-text.schema';
import SlottedText from '@/components/playbook-elements/slotted-text/slotted-text';
import Toggle from '@/components/playbook-elements/toggle/toggle';
import styles from './contact.module.css';

type ContactType = z.infer<typeof ContactSchema>;
type SlotValueType = z.infer<typeof SlotValueSchema>;

type Props = {
  contact: ContactType;
  relationship?: number;
  variant?: 'upDown' | 'neutral';
  slotValues?: SlotValueType;
  onRelationshipUpdate: (id: string, value: number) => void;
  onSlotUpdate: (newSlotValue: SlotValueType) => void;
};

export default function Contact(props: Props) {
  const {
    contact,
    variant,
    relationship,
    slotValues,
    onRelationshipUpdate,
    onSlotUpdate
  } = props;
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const consistentId = useId();

  return (
    <div>
      <div className={variant === 'upDown' ? styles.up : styles.neutral}>
        <Toggle
          type='triangle'
          size={15}
          filled={relationship === 1}
          highlighted={highlighted === 1}
          controlType='radio'
          controlProps={{
            name: consistentId,
            checked: relationship === 1,
            onMouseEnter: () => setHighlighted(1),
            onMouseLeave: () => setHighlighted(null),
            onChange: () => {
              onRelationshipUpdate(contact.id, relationship === 1 ? 0 : 1);
            }
          }}
        />
      </div>
      {variant === 'upDown' && (
        <div className={styles.down}>
          <Toggle
            size={15}
            type='triangle'
            filled={relationship === -1}
            highlighted={highlighted === -1}
            controlType='radio'
            controlProps={{
              name: consistentId,
              checked: relationship === -1,
              onMouseEnter: () => setHighlighted(-1),
              onMouseLeave: () => setHighlighted(null),
              onChange: () => {
                onRelationshipUpdate(contact.id, relationship === -1 ? 0 : -1);
              }
            }}
          />
        </div>
      )}
      <span className={styles.name}>
        <SlottedText
          text={contact.name}
          slots={contact.slots}
          values={slotValues}
          onUpdate={onSlotUpdate}
        />
      </span>
    </div>
  );
}
