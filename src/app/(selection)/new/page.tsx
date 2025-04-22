import { getJson } from '@/lib/system-data';
import { System } from '@/schemas';
import systemsJson from '@/systems/systems.json';
import OptionList from '../components/option-list';
import Separator from '../components/separator';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  const availableSystems = systemsJson.systems
    .map((system) => {
      return System.parse(getJson(system.id, 'system'));
    })
    .map((system) => ({
      id: system.id,
      href: `/new/${system.id}`,
      name: system.name,
      description: system.description
    }));

  return (
    <div>
      <OptionList
        heading={t('UI.Selection.pickYourSystem')}
        options={availableSystems}
      />
      <Separator />
      <div>{t('UI.Selection.moreToCome')}</div>
    </div>
  );
}
