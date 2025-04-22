import styles from './heading.module.css';

type Props = {
  children: React.ReactNode;
};

export default function Heading(props: Props) {
  const { children } = props;

  return <h2 className={styles.heading}>{children}</h2>;
}
