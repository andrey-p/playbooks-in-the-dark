import CircleToggle from '@/components/toggles/circle';
import type { SpecialAbility } from '@/types';
import styles from './special-ability.module.css';

type Props = {
  specialAbility: SpecialAbility
};

export default function SpecialAbilitiesList(props: Props) {
  const { specialAbility } = props;

  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        <CircleToggle />
      </div>

      <span className={styles.name}>{specialAbility.name}:</span>
      <span>{specialAbility.description}</span>
    </div>
  );
}
