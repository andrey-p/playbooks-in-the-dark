import Link from 'next/link';
import styles from './footer-links.module.css';
import { useTranslations } from 'next-intl';

export default function FooterLinks() {
  const t = useTranslations();

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
        <Link href='/faq'>{t('UI.Global.faq')}</Link>
      </li>
    </ul>
  );
}
