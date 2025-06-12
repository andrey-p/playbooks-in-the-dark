import styles from './row.module.css';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
};

export default function Row(props: Props) {
  const { children } = props;

  return <div className={clsx('row', styles.row)}>{children}</div>;
}
