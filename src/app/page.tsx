//import styles from "./page.module.css";
import Link from 'next/link';
import { getJson } from '@/lib/system-data';
import type { PlaybookDefinition } from '@/types';

export default function Home() {
  const systemCharactersData = getJson(
    'bitd',
    'character'
  ) as PlaybookDefinition;

  return (
    <div>
      New character:
      {systemCharactersData.playbooks.map((playbook: string) => (
        <Link key={playbook} href={`bitd/character/${playbook}`}>
          {playbook}
        </Link>
      ))}
    </div>
  );
}
