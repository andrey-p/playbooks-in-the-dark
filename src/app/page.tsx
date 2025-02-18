//import styles from "./page.module.css";
import Link from 'next/link';
import { getJson } from '@/lib/data';
import type { System } from '@/types';

export default function Home() {
  const systemData = getJson('bitd', 'system') as System;

  return (
    <div>
      New character:

      {systemData.characterPlaybooks.map(playbook => (
        <Link
          key={playbook}
          href={`bitd/character/${playbook}`}
        >
          {playbook}
        </Link>
      ))}
    </div>
  );
}
