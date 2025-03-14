import styles from './triangle.module.css';
import type { ToggleProps } from './toggles.types';
import clsx from 'clsx';

type Props = ToggleProps;

export default function Triangle(props: Props) {
  const { size, filled, highlighted, ...rest } = props;

  const height = size || 25;
  const width = height / 1.5;

  return (
    <button
      role='switch'
      aria-checked={filled}
      style={{ width, height }}
      className={styles.container}
      {...rest}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path
          className={clsx(
            styles.default,
            filled && styles.filled,
            highlighted && styles.highlighted
          )}
          d={`M ${width / 2},0 ${width},${height / 2} ${width / 2},${height} 0,${height / 2} Z`}
        />
      </svg>
    </button>
  );
}
