import { z } from 'zod';
import { useState } from 'react';
import CircleToggle from '@/components/toggles/circle';
import { SpecialAbility as SpecialAbilitySchema } from './special-abilities.schema';
import styles from './special-ability.module.css';
import Description from '@/components/description/description';

type Props = {
  specialAbility: z.infer<typeof SpecialAbilitySchema>;
  selected: boolean;
  onSelect: (selected: boolean) => void;
};

export default function SpecialAbility(props: Props) {
  const { specialAbility, selected, onSelect } = props;
  const [highlighted, setHighlighted] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        <CircleToggle
          filled={selected}
          highlighted={highlighted}
          onMouseEnter={() => setHighlighted(true)}
          onMouseLeave={() => setHighlighted(false)}
          onClick={() => onSelect(!selected)}
        />
      </div>

      <span className={styles.name}>{specialAbility.name}: </span>
      <Description
        text={specialAbility.description}
      />
    </div>
  );
}
