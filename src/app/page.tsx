//import styles from "./page.module.css";
import Link from 'next/link';
import { getJson } from '@/lib/system-data';
import { System } from '@/schemas';
import systemsJson from '@/systems/systems.json';

export default function Home() {
  const availableSystems = systemsJson.systems.map((system) => {
    return System.parse(getJson(system.id, 'system'));
  });

  return (
    <div>
      New character:
      {availableSystems.map((system) => (
        <Link key={system.id} href={`/${system.id}`}>
          {system.name}
        </Link>
      ))}
    </div>
  );
}
