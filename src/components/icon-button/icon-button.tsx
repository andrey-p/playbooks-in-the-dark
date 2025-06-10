import styles from './icon-button.module.css';
import { JSX } from 'react';

type ButtonProps = JSX.IntrinsicElements['button'];

type Props = ButtonProps & {
  label: string;
  icon: React.ReactNode;
};

export default function IconButton(props: Props) {
  const { label, icon, ...rest } = props;

  return (
    <button className={styles.button} aria-label={label} {...rest}>
      {icon}
    </button>
  );
}
