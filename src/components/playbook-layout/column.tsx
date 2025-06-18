import styles from './column.module.css';
import clsx from 'clsx';
import { JSX } from 'react';

type DivProps = JSX.IntrinsicElements['div'];

export default function Column(props: DivProps) {
  const { children } = props;

  return <div className={clsx(styles.column, 'column')}>{children}</div>;
}
