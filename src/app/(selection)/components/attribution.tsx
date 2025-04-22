import styles from './attribution.module.css';

export default function Attribution() {
  return (
    <div className={styles.container}>
      <p className={styles.p}>
        This work is based on{' '}
        <a target='_blank' href='http://www.bladesinthedark.com/'>
          Blades in the Dark
        </a>
        , product of One Seven Design, developed and authored by John Harper,
        and licensed for our use under the{' '}
        <a target='_blank' href='http://creativecommons.org/licenses/by/3.0/'>
          Creative Commons Attribution 3.0 Unported license
        </a>
        .
      </p>
      <p className={styles.p}>
        This website by Andrey Pissantchev. This is a fan project, very much
        unaffiliated with any of the original creators.
      </p>
    </div>
  );
}
