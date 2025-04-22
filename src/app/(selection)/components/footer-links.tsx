import Link from 'next/link';
import styles from './footer-links.module.css';

export default function FooterLinks() {
  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <Link
          href='https://github.com/andrey-p/playbooks-in-the-dark'
          target='_blank'
        >
          Github
        </Link>
      </li>
      <li className={styles.item}>
        <Link href='/faq'>FAQ</Link>
      </li>
    </ul>
  );
}
