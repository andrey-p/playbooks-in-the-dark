import styles from './row.module.css';

type Props = {
  children: React.ReactNode;
};

export default function Row(props: Props) {
  const { children } = props;

  return <div className={styles.row}>{children}</div>;
}
