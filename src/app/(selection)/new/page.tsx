import { getJson } from '@/lib/system-data';
import { System } from '@/schemas';
import systemsJson from '@/systems/systems.json';
import OptionList from '../components/option-list';
import Separator from '../components/separator';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations();

  const availableSystems = [];

  for (const system of systemsJson.systems) {
    const systemData = System.parse(await getJson(system.id, 'system'));

    availableSystems.push({
      id: system.id,
      href: `/new/${systemData.id}`,
      name: t(systemData.name),
      description: t(systemData.description)
    });
  }

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
