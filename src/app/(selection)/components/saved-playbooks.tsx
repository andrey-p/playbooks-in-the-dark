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

    // playbook.name and playbook.description are verbatim strings that
    // are no longer set for newly saved character sheets
    // they're still checked here for backwards compatibility
    let name = playbook.name || playbook.modules?.name?.text;
    const description =
      playbook.description ||
      t(`${system.translationNamespace}.Playbooks.${playbook.playbookId}`);

    // no name, show this as e.g. "an unnamed cutter"
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
