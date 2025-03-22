import styles from './layout.module.css';
import Attribution from './components/attribution';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <div className={styles.container}>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading} aria-label='Playbooks in the Dark'></h1>
        <div className={styles.subheading}>
          A modular character builder for Forged in the Dark games
          <br />
          <span className={styles.highlight}>(Currently in Alpha!)</span>
        </div>
      </div>
      {children}
      <footer className={styles.footer}>
        <Attribution />
      </footer>
    </div>
  );
}
