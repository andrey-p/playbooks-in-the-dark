import { z } from 'zod';
import { useState, useId } from 'react';
import { Contact as ContactSchema } from './contacts.schema';
import { SlotValue as SlotValueSchema } from '@/components/playbook-elements/slotted-text/slotted-text.schema';
import SlottedText from '@/components/playbook-elements/slotted-text/slotted-text';
import Toggle from '@/components/playbook-elements/toggle/toggle';
import RadioControlWrapper from '@/components/playbook-elements/radio-control-wrapper/radio-control-wrapper';
import styles from './contact.module.css';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations();

  return (
    <RadioControlWrapper
      name={consistentId}
      zeroSelected={relationship === 0}
      onZeroSelect={() => onRelationshipUpdate(contact.id, 0)}
      label={contact.name}
    >
      <div className={variant === 'upDown' ? styles.up : styles.neutral}>
        <Toggle
          type='triangle'
          size={15}
          filled={relationship === 1}
          highlighted={highlighted === 1}
          controlType='radio'
          controlProps={{
            name: consistentId,
            'aria-label':
              variant === 'upDown'
                ? t('UI.ModulesShared.contactsPositive')
                : t('UI.ModulesShared.contactsNeutral'),
            checked: relationship === 1,
            onMouseEnter: () => setHighlighted(1),
            onMouseLeave: () => setHighlighted(null),
            onChange: () => {
              onRelationshipUpdate(contact.id, 1);
            },
            onClick: () => {
              if (relationship === 1) {
                onRelationshipUpdate(contact.id, 0);
              }
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
              'aria-label': t('UI.ModulesShared.contactsNegative'),
              checked: relationship === -1,
              onMouseEnter: () => setHighlighted(-1),
              onMouseLeave: () => setHighlighted(null),
              onChange: () => {
                onRelationshipUpdate(contact.id, relationship === -1 ? 0 : -1);
              },
              onClick: () => {
                if (relationship === -1) {
                  onRelationshipUpdate(contact.id, 0);
                }
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
    </RadioControlWrapper>
  );
}
