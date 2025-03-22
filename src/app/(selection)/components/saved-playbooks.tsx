import OptionList from './option-list';
import Separator from './separator';
import { getPlaybooks } from '@/lib/local-storage';

export default function SavedPlaybooks() {
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
      <OptionList heading='Your saved playbooks' options={savedOptions} />
      <Separator />
    </>
  );
}
