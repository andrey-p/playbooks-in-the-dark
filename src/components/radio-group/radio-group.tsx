import { useId } from 'react';
import styles from './radio-group.module.css';

import DaggerToggle from '@/components/toggles/dagger';
import RhombusToggle from '@/components/toggles/rhombus';
import type { TogglePropsType } from '@/components/toggles/toggles.types';

type Option = { id: string | null; name: string };

type RadioType = 'rhombus' | 'dagger';

type Props = {
  options: Option[];
  selected: string | null;
  onValueSelect: (id: string | null) => void;
  type: RadioType;
};

function getToggleComponent(type: RadioType): React.FC<TogglePropsType> {
  switch (type) {
    case 'rhombus':
      return RhombusToggle;
    case 'dagger':
      return DaggerToggle;
    default:
      throw new Error('unexpected tracker type ' + type);
  }
}

export default function RadioGroup(props: Props) {
  const { options, selected, type, onValueSelect } = props;
  const id = useId();

  const onChange = (id: string | null) => {
    if (id === selected) {
      onValueSelect(null);
    } else {
      onValueSelect(id);
    }
  };

  const ToggleComponent = getToggleComponent(type);

  return (
    <ul className={styles.list}>
      {options.map((option: Option) => (
        <li key={option.id} className={styles.item}>
          <label>
            <ToggleComponent
              filled={selected === option.id}
              size={15}
              onClick={() => onChange(option.id)}
            />
            <span className={styles.name}>{option.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
