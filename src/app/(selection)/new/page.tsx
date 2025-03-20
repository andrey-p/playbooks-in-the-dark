import { getJson } from '@/lib/system-data';
import { System } from '@/schemas';
import systemsJson from '@/systems/systems.json';
import OptionList from '../components/option-list';
import Separator from '../components/separator';

export default function Home() {
  const availableSystems = systemsJson.systems
    .map((system) => {
      return System.parse(getJson(system.id, 'system'));
    })
    .map((system) => ({
      id: system.id,
      href: `/${system.id}`,
      name: system.name,
      description: system.description
    }));

  return (
    <div>
      <OptionList heading='Pick your system' options={availableSystems} />
      <Separator />
      <div>(More to come soon.)</div>
    </div>
  );
}
