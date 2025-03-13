import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <div className={styles.container}>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>
          <div className={styles.play}>Play</div>
          <div className={styles.books}>books</div>
          <div className={styles.inThe}>in the</div>
          <div className={styles.dark}>Dark</div>
        </h1>
        <div className={styles.subheading}>
          A modular character builder for Forged in the Dark games
        </div>
      </div>
      {children}
    </div>
  );
}
