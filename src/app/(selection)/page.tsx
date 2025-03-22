'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './page.module.css';

const SavedPlaybooks = dynamic(() => import('./components/saved-playbooks'), {
  ssr: false
});

export default function Home() {
  return (
    <div>
      <SavedPlaybooks />
      <Link className={styles.link} href='/new'>
        New playbook
      </Link>
    </div>
  );
}
