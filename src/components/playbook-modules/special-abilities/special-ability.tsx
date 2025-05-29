import { useId } from 'react';
import { z } from 'zod';
import SimpleTracker from '@/components/playbook-elements/trackers/simple-tracker';
import { SpecialAbility as SpecialAbilitySchema } from './special-abilities.schema';
import { SlotValue as SlotValueSchema } from '@/components/playbook-elements/slotted-text/slotted-text.schema';
import SlottedText from '@/components/playbook-elements/slotted-text/slotted-text';
import styles from './special-ability.module.css';
import Description from '@/components/playbook-elements/description/description';
import { useTranslations } from 'next-intl';

type SlotValueType = z.infer<typeof SlotValueSchema>;

type Props = {
  specialAbility: z.infer<typeof SpecialAbilitySchema>;
  selected?: number;
  onSelect: (selected: number) => void;
  slotValues?: SlotValueType;
  onSlotUpdate: (newSlotValue: SlotValueType) => void;
};

export default function SpecialAbility(props: Props) {
  const { specialAbility, selected, slotValues, onSlotUpdate, onSelect } =
    props;
  const t = useTranslations();
  const consistentId = useId();

  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        <SimpleTracker
          value={selected || 0}
          type='circle'
          labelledBy={consistentId}
          max={specialAbility.max || 1}
          onValueSelect={onSelect}
        />
      </div>
      <div>
        <span className={styles.name} id={consistentId}>
          {t(specialAbility.name)}:{' '}
        </span>
        {specialAbility.slots ? (
          <SlottedText
            text={specialAbility.description}
            slots={specialAbility.slots}
            values={slotValues}
            onUpdate={onSlotUpdate}
          />
        ) : (
          <Description text={specialAbility.description} />
        )}
      </div>
    </div>
  );
}
