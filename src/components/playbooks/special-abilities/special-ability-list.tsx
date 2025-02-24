import type { SpecialAbility as SpecialAbilityType } from '@/types';
import SpecialAbility from './special-ability';

type Props = {
  specialAbilities: SpecialAbilityType[]
};

export default function SpecialAbilityList(props: Props) {
  const { specialAbilities } = props;

  return (
    <ul>
      {specialAbilities.map(specialAbility => (
        <li key={specialAbility.id}>
          <SpecialAbility
            specialAbility={specialAbility}
          />
        </li>
      ))}
    </ul>
  );
}
