import { z } from 'zod';
import PropsSchema, {
  SpecialAbility as SpecialAbilitySchema
} from './special-abilities.schema';
import { SlotValue as SlotValueSchema } from '@/components/playbook-elements/slotted-text/slotted-text.schema';
import SpecialAbility from './special-ability';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';
import styles from './special-abilities.module.css';

type Props = z.infer<typeof PropsSchema>;
type SpecialAbilityType = z.infer<typeof SpecialAbilitySchema>;
type SlotValueType = z.infer<typeof SlotValueSchema>;

export default function SpecialAbilities(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps } = props;
  const specialAbilities = playbookProps;
  const { selected, slots: slotValues } = userValue;

  const onSpecialAbilitySelect = (
    specialAbilityId: string,
    selectedValue: number
  ) => {
    const nextSelectedAbilities = {
      ...selected,
      [specialAbilityId]: selectedValue
    };

    onUpdate({
      selected: nextSelectedAbilities,
      slots: slotValues
    });
  };

  const onSlotUpdate = (newSlots: SlotValueType) => {
    onUpdate({
      selected,
      slots: newSlots
    });
  };

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      <ul className={styles.list}>
        {specialAbilities.abilities.map(
          (specialAbility: SpecialAbilityType) => (
            <li key={specialAbility.id}>
              <SpecialAbility
                specialAbility={specialAbility}
                selected={selected[specialAbility.id]}
                onSelect={(selected) =>
                  onSpecialAbilitySelect(specialAbility.id, selected)
                }
                slotValues={slotValues}
                onSlotUpdate={onSlotUpdate}
              />
            </li>
          )
        )}
      </ul>
    </ModuleWrapper>
  );
}
