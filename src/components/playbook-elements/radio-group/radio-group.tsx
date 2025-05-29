import { z } from 'zod';
import { useState, useId, JSX } from 'react';
import styles from './radio-group.module.css';
import Toggle from '@/components/playbook-elements/toggle/toggle';
import { RadioGroupProps as RadioGroupPropsSchema } from './radio-group.schema';
import { useTranslations } from 'next-intl';

type PropsWithLabel = z.infer<typeof RadioGroupPropsSchema> & {
  onValueSelect: (value: string | null) => void;
  label: string;
};

type PropsWithLabelledBy = z.infer<typeof RadioGroupPropsSchema> & {
  onValueSelect: (value: string | null) => void;
  labelledBy: string;
};

type Props = PropsWithLabel | PropsWithLabelledBy;

export default function RadioGroup(props: Props) {
  const { options, value, size, type, onValueSelect, invertColours, ...rest } =
    props;
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const t = useTranslations();
  const consistentId = useId();

  const toggles: JSX.Element[] = [
    // secret zeroth toggle
    // rendered outside of the visible radio group space,
    // but within the accessibility tree
    // so keyboard users can zero out the radio group
    <div key={-1} className={styles.toggleZeroContainer}>
      <input
        type='radio'
        name={consistentId}
        checked={value === null}
        className={styles.toggleZero}
        aria-label='0'
        onChange={() => {
          onValueSelect(null);
        }}
      />
    </div>
  ];

  options.forEach((option) => {
    toggles.push(
      <div key={option.id} className={styles.item}>
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
              onChange: () => {
                onValueSelect(option.id);
              },
              onClick: () => {
                if (option.id === value) {
                  onValueSelect(null);
                }
              },
              onMouseEnter: () => setHighlightedId(option.id),
              onMouseLeave: () => setHighlightedId(null)
            }}
          />
          <span className={styles.name}>{t(option.name)}</span>
        </label>
      </div>
    );
  });

  return (
    <fieldset
      className={styles.container}
      aria-labelledby={'labelledBy' in rest ? rest.labelledBy : undefined}
    >
      {rest.label && <legend className={styles.legend}>{t(rest.label)}</legend>}
      {toggles}
    </fieldset>
  );
}
