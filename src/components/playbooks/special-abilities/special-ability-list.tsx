import type { SpecialAbility as SpecialAbilityType } from '@/types';
import SpecialAbility from './special-ability';

type Props = {
  specialAbilities: SpecialAbilityType[],
  selectedAbilities: string[],
  onSpecialAbilitySelect: (specialAbilityId: string, selected: boolean) => void
};

export default function SpecialAbilityList(props: Props) {
  const { specialAbilities, selectedAbilities, onSpecialAbilitySelect } = props;

  return (
    <ul>
      {specialAbilities.map(specialAbility => (
        <li key={specialAbility.id}>
          <SpecialAbility
            specialAbility={specialAbility}
            selected={selectedAbilities.includes(specialAbility.id)}
            onSelect={(selected) => onSpecialAbilitySelect(specialAbility.id, selected)}
          />
        </li>
      ))}
    </ul>
  );
}
