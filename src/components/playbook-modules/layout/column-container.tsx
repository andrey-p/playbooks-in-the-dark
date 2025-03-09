import styles from './column-container.module.css';

type Props = {
  children: React.ReactNode;
};

export default function ColumnContainer(props: Props) {
  const { children } = props;

  return (
    <div className={styles.container}>{children}</div>
  );
}
