import { z } from 'zod';
import styles from './toggle.module.css';
import clsx from 'clsx';

import { ToggleProps as TogglePropsSchema } from './toggle.schema';

type Props = z.infer<typeof TogglePropsSchema> & {
  controlType: 'switch' | 'checkbox' | 'radio';
  controlProps:
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export default function Toggle(props: Props) {
  const {
    type,
    size,
    highlighted,
    invertColours,
    controlType,
    controlProps,
    filled
  } = props;

  const height = size || 20;
  let width = height;
  let shape;

  switch (type) {
    case 'rhombus':
      width = height / 1.5;
      shape = (
        <path
          d={`M ${width / 2},0 ${width},${height / 2} ${width / 2},${height} 0,${height / 2} Z`}
        />
      );
      break;
    case 'dagger':
      width = height / 2.5;
      shape = (
        <path d={`M 0,0 ${width},0 ${width},${height / 1.5} 0,${height} Z`} />
      );
      break;
    case 'rectangle':
      width = height / 2.5;
      shape = <path d={`M 0,0 ${width},0 ${width},${height} 0,${height} Z`} />;
      break;
    case 'circle':
      shape = <circle cy={width / 2} cx={width / 2} r={width / 2} />;
      break;
    case 'triangle':
      shape = (
        <path d={`M ${width / 2},0 ${width},${height} ${0},${height} Z`} />
      );
      break;
    case 'square':
      shape = <path d={`M 0,0 ${width},0 ${width},${height}, 0,${height} Z`} />;
      break;
  }

  let control;

  // this control is rendered with opacity: 0
  // to make sure the toggle is in the accessibility tree
  switch (controlType) {
    case 'switch':
      const buttonProps =
        controlProps as React.ButtonHTMLAttributes<HTMLButtonElement>;

      control = (
        <button
          {...buttonProps}
          role='switch'
          className={styles.control}
          aria-checked={filled}
        />
      );
    case 'checkbox':
    case 'radio':
      const inputProps =
        controlProps as React.InputHTMLAttributes<HTMLInputElement>;

      control = (
        <input
          {...inputProps}
          type={controlType}
          className={styles.control}
          checked={
            typeof inputProps.checked === 'undefined'
              ? filled
              : inputProps.checked
          }
        />
      );
  }

  return (
    <div
      className={clsx(
        styles.container,
        styles.default,
        filled && styles.filled,
        highlighted && styles.highlighted,
        invertColours && styles.inverted,
        'toggle',
        type
      )}
      style={{ width, height }}
    >
      {control}
      <svg
        width={width}
        height={height}
        // add 2px around the viewbox so the
        // shape stroke doesn't get cut off
        viewBox={`-2 -2 ${width + 4} ${height + 4}`}
      >
        {shape}
      </svg>
    </div>
  );
}
