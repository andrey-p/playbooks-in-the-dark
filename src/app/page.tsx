//import styles from "./page.module.css";
import Link from 'next/link';
import { getJson } from '@/lib/system-data';
import type { SystemCharacters } from '@/types';

export default function Home() {
  const systemCharactersData = getJson(
    'bitd',
    'characters'
  ) as SystemCharacters;

  return (
    <div>
      New character:
      {systemCharactersData.playbooks.map((playbook) => (
        <Link key={playbook} href={`bitd/character/${playbook}`}>
          {playbook}
        </Link>
      ))}
    </div>
  );
}
