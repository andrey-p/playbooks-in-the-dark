import { z } from 'zod';
import styles from './toggle.module.css';
import clsx from 'clsx';

import { ToggleProps as TogglePropsSchema } from './toggle.schema';

type Props = z.infer<typeof TogglePropsSchema> & {
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Toggle(props: Props) {
  const { type, size, highlighted, invertColours, filled, ...rest } = props;

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

  return (
    <button
      role='switch'
      aria-checked={filled}
      className={clsx(
        styles.container,
        styles.default,
        filled && styles.filled,
        highlighted && styles.highlighted,
        invertColours && styles.inverted
      )}
      style={{ width, height }}
      {...rest}
    >
      {/* add 2px around the viewbox so the
        shape stroke doesn't get cut off */}
      <svg
        width={width}
        height={height}
        viewBox={`-2 -2 ${width + 4} ${height + 4}`}
      >
        {shape}
      </svg>
    </button>
  );
}
