import { z } from 'zod';
import SimpleTracker from '@/components/playbook-elements/trackers/simple-tracker';
import { SpecialAbility as SpecialAbilitySchema } from './special-abilities.schema';
import styles from './special-ability.module.css';
import Description from '@/components/playbook-elements/description/description';
import { useTranslations } from 'next-intl';

type Props = {
  specialAbility: z.infer<typeof SpecialAbilitySchema>;
  selected?: number;
  onSelect: (selected: number) => void;
};

export default function SpecialAbility(props: Props) {
  const { specialAbility, selected, onSelect } = props;
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        <SimpleTracker
          value={selected || 0}
          type='circle'
          max={specialAbility.max || 1}
          onValueSelect={onSelect}
        />
      </div>
      <div>
        <span className={styles.name}>{t(specialAbility.name)}: </span>
        <Description text={specialAbility.description} />
      </div>
    </div>
  );
}
