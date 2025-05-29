import { z } from 'zod';
import { useState, useId } from 'react';
import styles from './simple-tracker.module.css';
import clsx from 'clsx';
import Toggle from '@/components/playbook-elements/toggle/toggle';
import { TrackerProps as TrackerPropsSchema } from './trackers.schema';

type Props = z.infer<typeof TrackerPropsSchema> & {
  onValueSelect?: (value: number) => void;
};

export default function SimpleTracker(props: Props) {
  const {
    value = 0,
    readOnly,
    max,
    type,
    variant,
    reverse,
    wrap,
    onValueSelect
  } = props;
  let { size } = props;

  const [highlightedValue, setHighlightedValue] = useState<number | null>(null);

  if (type === 'clock') {
    throw new Error(
      'This component does not support a clock value - use the clock component instead'
    );
  }

  const consistentId = useId();

  // make the default size of dagger trackers
  // visually similar to other sizes
  if (!size && type === 'dagger') {
    size = 30;
  }

  const toggles = [
    // secret zeroth toggle
    // rendered outside of the visible tracker space,
    // but within the accessibility tree
    // so keyboard users can zero out the tracker
    <div key={-1} className={styles.toggleZeroContainer}>
      <input
        type='radio'
        name={consistentId}
        value={0}
        checked={value === 0}
        className={styles.toggleZero}
        aria-label='0'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (onValueSelect && !readOnly) {
            onValueSelect(parseInt(e.target.value));
          }
        }}
      />
    </div>
  ];

  for (let i = 0; i < max; i++) {
    // highlight all the toggles up to and including
    // the one that was highlighted
    const highlighted =
      typeof highlightedValue === 'number' ? i < highlightedValue : false;

    toggles.push(
      <div key={i} className={clsx(styles.toggle, 'tracker-toggle')}>
        <Toggle
          // PITD trackers superficially feel like they should be <input type='range'/>
          // but realistically they're more like a radio group with discrete
          // (albeit numeric) options
          // using <input type='radio'/> also provides some handy keyboard shortcuts out of the box
          controlType='radio'
          controlProps={{
            name: consistentId,
            value: i + 1,
            checked: i === value - 1,
            'aria-label': (i + 1).toString(),
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              if (onValueSelect && !readOnly) {
                onValueSelect(parseInt(e.target.value));
              }
            },
            onClick: () => {
              if (onValueSelect && !readOnly) {
                // click selected value to deselect
                if (i === value - 1) {
                  onValueSelect(0);
                }
              }
            },
            onMouseEnter: () => {
              if (!readOnly) {
                setHighlightedValue(i + 1);
              }
            }
          }}
          type={type}
          filled={i < value}
          highlighted={highlighted}
          size={size}
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
