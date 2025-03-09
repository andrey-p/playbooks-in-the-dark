import styles from './square.module.css';
import clsx from 'clsx';
import type { ToggleProps } from './toggles.types';

export default function Square(props: ToggleProps) {
  const { filled, highlighted, ...rest } = props;
  let { size } = props;

  size = size || 25;

  return (
    <button
      role='switch'
      aria-checked={filled}
      style={{ width: size, height: size }}
      className={clsx(
        styles.default,
        filled && styles.filled,
        highlighted && styles.highlighted
      )}
      {...rest}
    ></button>
  );
}
