import styles from './dagger.module.css';
import type { ToggleProps } from './toggles.types';
import clsx from 'clsx';

export default function Dagger(props: ToggleProps) {
  const { size, filled, highlighted, ...rest } = props;

  const height = size || 25;
  const width = height / 2.5;

  return (
    <div
      style={{ width, height }}
      {...rest}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <path
          className={clsx(
            styles.default,
            filled && styles.filled,
            highlighted && styles.highlighted
          )}
          d={`M 0,0 ${width},0 ${width},${height / 1.5} 0,${height} Z`}
        />
      </svg>
    </div>
  );
}
