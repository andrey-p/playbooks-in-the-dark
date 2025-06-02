import { System as SystemSchema } from '@/schemas';
import { getTranslations } from 'next-intl/server';
import { getJson } from '@/lib/system-data';
import { getPlaybook } from '@/lib/store';
import { Metadata } from 'next';

export async function getPlaybookEditorMetadata(
  systemId: string,
  playbookType: string,
  userId?: string
): Promise<Metadata> {
  let title = 'Playbook Editor';

  try {
    // if a user ID was provided, use any name provided as the page title
    if (userId) {
      const userData = await getPlaybook(userId);

      if (userData?.modules?.name?.text) {
        return {
          title: userData?.modules.name.text
        };
      }
    }

    // otherwise get something based on the playbook
    const systemData = SystemSchema.parse(await getJson(systemId, 'system'));
    const t = await getTranslations();

    title = t(
      `${systemData.translationNamespace}.Playbooks.unnamed.${playbookType}`
    );
  } catch {}

  return { title };
}

export async function getTranslatedMetadata(translationId: string) {
  const t = await getTranslations();

  return {
    title: t(translationId)
  };
}
