import OptionList from './option-list';
import Separator from './separator';
import { getPlaybooks } from '@/lib/local-storage';
import { useTranslations } from 'next-intl';

export default function SavedPlaybooks() {
  const t = useTranslations();

  const savedOptions = getPlaybooks().map((playbook) => {
    return {
      id: playbook.id || '',
      href: `/${playbook.systemId}/${playbook.playbookType}/${playbook.playbookId}/${playbook.id}`,
      name: playbook.name,
      description: playbook.description
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
