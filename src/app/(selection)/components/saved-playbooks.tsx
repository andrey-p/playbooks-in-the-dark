import OptionList from './option-list';
import Separator from './separator';
import { getPlaybooks } from '@/lib/local-storage';
import { useTranslations } from 'next-intl';
import systemsJson from '@/systems/systems.json';

export default function SavedPlaybooks() {
  const t = useTranslations();

  const savedOptions = getPlaybooks().map((playbook) => {
    const system = systemsJson.systems.find(
      (system) => system.id === playbook.systemId
    );

    if (!system) {
      throw new Error("Couldn't find system: " + playbook.systemId);
    }

    let name = playbook.name || playbook.modules?.name?.text;
    const description =
      playbook.description ||
      t(`${system.translationNamespace}.Playbooks.${playbook.playbookId}`);

    if (!name) {
      name = t(
        `${system.translationNamespace}.Playbooks.unnamed.${playbook.playbookType}`
      );
    }

    return {
      id: playbook.id || '',
      href: `/${system.id}/${playbook.playbookType}/${playbook.playbookId}/${playbook.id}`,
      name,
      description
    };
  });

  if (!savedOptions.length) {
    return null;
  }

  return (
    <>
      <OptionList
        heading={t('UI.Selection.yourSavedPlaybooks')}
        options={savedOptions}
      />
      <Separator />
    </>
  );
}
