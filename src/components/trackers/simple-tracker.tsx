import { z } from 'zod';
import { useState } from 'react';
import styles from './simple-tracker.module.css';
import clsx from 'clsx';
import Toggle from '@/components/toggle/toggle';
import { TrackerProps as TrackerPropsSchema } from './trackers.schema';

type Props = z.infer<typeof TrackerPropsSchema> & {
  onValueSelect?: (value: number) => void;
};

export default function SimpleTracker(props: Props) {
  const { value, max, type, variant, reverse, wrap, onValueSelect } = props;
  let { size } = props;

  const [highlightedValue, setHighlightedValue] = useState<number | null>(null);

  if (type === 'clock') {
    throw new Error(
      'This component does not support a clock value - use the clock component instead'
    );
  }

  // make the default size of dagger trackers
  // visually similar to other sizes
  if (!size && type === 'dagger') {
    size = 30;
  }

  const toggles = [];

  for (let i = 0; i < max; i++) {
    // highlight all the toggles up to and including
    // the one that was highlighted
    const highlighted =
      typeof highlightedValue === 'number' ? i < highlightedValue : false;

    toggles.push(
      <div key={i} className={clsx(styles.toggle, 'tracker-toggle')}>
        <Toggle
          type={type}
          filled={i < value}
          highlighted={highlighted}
          size={size}
          onClick={() => {
            if (onValueSelect) {
              if (value === i + 1) {
                onValueSelect(0);
              } else {
                onValueSelect(i + 1);
              }
            }
          }}
          onMouseEnter={() => {
            setHighlightedValue(i + 1);
          }}
        />
      </div>
    );
  }

  if (reverse) {
    toggles.reverse();
  }

  return (
    <div
      className={clsx(
        styles.container,
        variant && styles[variant],
        wrap && styles.wrap,
        'tracker-container'
      )}
      onMouseLeave={() => {
        setHighlightedValue(null);
      }}
    >
      {toggles}
    </div>
  );
}
