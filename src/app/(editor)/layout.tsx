import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
}
