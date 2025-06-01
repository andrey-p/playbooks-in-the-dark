import { z } from 'zod';
import { useState, useId, JSX } from 'react';
import styles from './radio-group.module.css';
import Toggle from '@/components/playbook-elements/toggle/toggle';
import { RadioGroupProps as RadioGroupPropsSchema } from './radio-group.schema';
import RadioControlWrapper from '@/components/playbook-elements/radio-control-wrapper/radio-control-wrapper';
import { LabelOrLabelledBy as LabelOrLabelledBySchema } from '@/components/playbook-elements/radio-control-wrapper/radio-control-wrapper.schema';
import { useTranslations } from 'next-intl';

type Props = z.infer<typeof RadioGroupPropsSchema> &
  z.infer<typeof LabelOrLabelledBySchema> & {
    onValueSelect: (value: string | null) => void;
  };

export default function RadioGroup(props: Props) {
  const { options, value, size, type, onValueSelect, invertColours, ...rest } =
    props;
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const t = useTranslations();
  const consistentId = useId();

  const toggles: JSX.Element[] = [];

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
    <RadioControlWrapper
      name={consistentId}
      zeroSelected={value === null}
      onZeroSelect={() => onValueSelect(null)}
      {...rest}
    >
      {toggles}
    </RadioControlWrapper>
  );
}
