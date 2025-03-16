import { useState } from 'react';
import styles from './radio-group.module.css';
import Toggle from '@/components/toggle/toggle';

type Option = { id: string | null; name: string };

type RadioType = 'rhombus' | 'dagger';

type Props = {
  options: Option[];
  selected: string | null;
  onValueSelect: (id: string | null) => void;
  type: RadioType;
};

export default function RadioGroup(props: Props) {
  const { options, selected, type, onValueSelect } = props;
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const onChange = (id: string | null) => {
    if (id === selected) {
      onValueSelect(null);
    } else {
      onValueSelect(id);
    }
  };

  return (
    <ul className={styles.list}>
      {options.map((option: Option) => (
        <li key={option.id} className={styles.item}>
          <label>
            <Toggle
              type={type}
              filled={selected === option.id}
              highlighted={highlightedId === option.id}
              size={20}
              onClick={() => onChange(option.id)}
              onMouseEnter={() => setHighlightedId(option.id)}
              onMouseLeave={() => setHighlightedId(null)}
            />
            <span className={styles.name}>{option.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
