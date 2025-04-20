import styles from './column.module.css';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
};

export default function Column(props: Props) {
  const { children } = props;

  return <div className={clsx(styles.column, 'column')}>{children}</div>;
}
