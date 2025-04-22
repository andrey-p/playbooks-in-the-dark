'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

const SavedPlaybooks = dynamic(() => import('./components/saved-playbooks'), {
  ssr: false
});

export default function Home() {
  const t = useTranslations();

  return (
    <div>
      <SavedPlaybooks />
      <Link className={styles.link} href='/new'>
        {t('UI.Selection.newPlaybook')}
      </Link>
    </div>
  );
}
