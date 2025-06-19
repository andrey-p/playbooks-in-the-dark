import { useEffect, JSX, useRef } from 'react';
import styles from './slider-dot.module.css';
import clsx from 'clsx';

type ButtonProps = JSX.IntrinsicElements['button'];

type Props = ButtonProps & {
  active: boolean;
  label: string;
};

export default function SliderDot(props: Props) {
  const { active, label, ...rest } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current && active) {
      buttonRef.current.focus();
    }
  }, [active]);

  return (
    <button
      ref={buttonRef}
      role='tab'
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      className={clsx(styles.dot, active && styles.active)}
      aria-label={label}
      {...rest}
    />
  );
}
