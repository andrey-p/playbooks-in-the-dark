'use client';

import OptionList from './components/option-list';
import Separator from './components/separator';
import { getPlaybooks } from '@/lib/local-storage';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const savedOptions = getPlaybooks().map((playbook) => {
    return {
      id: playbook.id || '',
      href: `/${playbook.systemId}/${playbook.playbookType}/${playbook.playbookId}/${playbook.id}`,
      name: playbook.name,
      description: playbook.description
    };
  });

  return (
    <div>
      {savedOptions.length ? (
        <>
          <OptionList heading='Your saved playbooks' options={savedOptions} />
          <Separator />
        </>
      ) : null}
      <Link className={styles.link} href='/new'>
        New playbook
      </Link>
    </div>
  );
}
