import { z } from 'zod';
import { useState, useId } from 'react';
import styles from './radio-group.module.css';
import Toggle from '@/components/playbook-elements/toggle/toggle';
import { RadioGroupProps as RadioGroupPropsSchema } from './radio-group.schema';
import { useTranslations } from 'next-intl';

type Props = z.infer<typeof RadioGroupPropsSchema> & {
  onValueSelect: (id: string | null) => void;
};

export default function RadioGroup(props: Props) {
  const { options, value, size, type, onValueSelect, invertColours } = props;
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const t = useTranslations();
  const consistentId = useId();

  const onChange = (id: string | null) => {
    if (id === value) {
      onValueSelect(null);
    } else {
      onValueSelect(id);
    }
  };

  return (
    <ul className={styles.list}>
      {options.map((option) => (
        <li key={option.id} className={styles.item}>
          <label className={styles.label}>
            <Toggle
              type={type}
              filled={value === option.id}
              highlighted={highlightedId === option.id}
              invertColours={invertColours}
              size={size || 20}
              controlType='radio'
              controlProps={{
                name: consistentId,
                checked: value === option.id,
                onClick: () => onChange(option.id),
                onMouseEnter: () => setHighlightedId(option.id),
                onMouseLeave: () => setHighlightedId(null)
              }}
            />
            <span className={styles.name}>{t(option.name)}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
