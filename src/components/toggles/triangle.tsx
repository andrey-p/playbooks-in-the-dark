import styles from './triangle.module.css';
import type { ToggleProps } from './toggles.types';
import clsx from 'clsx';

type Props = ToggleProps & {
  variant?: 'up' | 'down' | 'left' | 'right';
};

export default function Triangle(props: Props) {
  const { size, filled, highlighted, variant = 'up', ...rest } = props;

  const height = size || 20;
  const width = height;

  return (
    <button
      role='switch'
      aria-checked={filled}
      style={{ width, height }}
      className={clsx(styles.container, styles[variant])}
      {...rest}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path
          className={clsx(
            styles.default,
            filled && styles.filled,
            highlighted && styles.highlighted
          )}
          d={`M ${width / 2},0 ${width},${height} ${0},${height} Z`}
        />
      </svg>
    </button>
  );
}
