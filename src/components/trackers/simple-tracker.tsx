import { useState } from 'react';
import styles from './simple-tracker.module.css';
import clsx from 'clsx';
import Toggle from '@/components/toggle/toggle';

type TrackerType = 'circle' | 'dagger' | 'square';

type Props = {
  value: number;
  max: number;
  onValueSelect?: (value: number) => void;
  type: TrackerType;
  variant?: 'linked';
  wrap?: boolean;
};

export default function SimpleTracker(props: Props) {
  const { value, max, type, variant, wrap, onValueSelect } = props;
  // is borke https://github.com/facebook/react/issues/31687
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [highlightedValue, setHighlightedValue] = useState<number | null>(null);

  const toggles = [];

  for (let i = 0; i < max; i++) {
    // highlight all the toggles up to and including
    // the one that was highlighted
    const highlighted =
      typeof highlightedValue === 'number' ? i < highlightedValue : false;

    toggles.push(
      <div key={i} className={styles.toggle}>
        <Toggle
          type={type}
          filled={i < value}
          highlighted={highlighted}
          size={type === 'dagger' ? 30 : undefined}
          onClick={() => {
            if (onValueSelect) {
              onValueSelect(i + 1);
            }
          }}
          onMouseEnter={() => {
            setHighlightedValue(i + 1);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        styles.container,
        variant && styles[variant],
        wrap && styles.wrap
      )}
      onMouseLeave={() => {
        setHighlightedValue(null);
      }}
    >
      {toggles}
    </div>
  );
}
