import { JSX } from 'react';
import styles from './slider-dot.module.css';
import clsx from 'clsx';

type ButtonProps = JSX.IntrinsicElements['button'];

type Props = ButtonProps & {
  active: boolean;
  label: string;
};

export default function SliderDot(props: Props) {
  const { active, label, ...rest } = props;

  return (
    <button
      role='tab'
      aria-selected={active}
      className={clsx(styles.dot, active && styles.active)}
      aria-label={label}
      {...rest}
    />
  );
};
