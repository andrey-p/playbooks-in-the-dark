'use client';

import OptionList from './components/option-list';
import Separator from './components/separator';
import { getPlaybooks } from '@/lib/local-storage';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const playbookOptions = getPlaybooks().map((playbook) => {
    return {
      id: playbook.id || '',
      href: `/${playbook.systemId}/${playbook.playbookType}/${playbook.playbookId}/${playbook.id}`,
      name: playbook.name || 'An unnamed ' + playbook.playbookType
    };
  });

  return (
    <div>
      {playbookOptions.length ? (
        <>
          <OptionList
            heading='Your saved playbooks'
            options={playbookOptions}
          />
          <Separator />
        </>
      ) : null}
      <Link className={styles.link} href='/new'>
        New playbook
      </Link>
    </div>
  );
}
