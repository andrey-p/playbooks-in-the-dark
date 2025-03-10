import { z } from 'zod';
import PropsSchema, {
  SpecialAbility as SpecialAbilitySchema
} from './special-abilities.schema';
import { toggleArrayEntry } from '@/lib/utils';
import SpecialAbility from './special-ability';

type Props = z.infer<typeof PropsSchema>;
type SpecialAbilityType = z.infer<typeof SpecialAbilitySchema>;

export default function SpecialAbilities(props: Props) {
  const {
    moduleDefinition,
    userValue: selectedAbilities,
    onUpdate,
    playbookProps
  } = props;
  const specialAbilities = playbookProps;

  const onSpecialAbilitySelect = (
    specialAbilityId: string,
    selected: boolean
  ) => {
    const nextSelectedAbilities = toggleArrayEntry(
      specialAbilityId,
      selected,
      selectedAbilities
    );
    onUpdate(nextSelectedAbilities);
  };

  return (
    <div>
      <h3>{moduleDefinition.label}</h3>
      <ul>
        {specialAbilities.map((specialAbility: SpecialAbilityType) => (
          <li key={specialAbility.id}>
            <SpecialAbility
              specialAbility={specialAbility}
              selected={selectedAbilities.includes(specialAbility.id)}
              onSelect={(selected) =>
                onSpecialAbilitySelect(specialAbility.id, selected)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
