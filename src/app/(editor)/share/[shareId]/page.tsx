import { notFound } from 'next/navigation';
import { getJson } from '@/lib/system-data';
import { NotFoundError } from '@/lib/errors';
import {
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  System as SystemSchema
} from '@/schemas';
import PlaybookEditor from '../../components/playbook-editor';
import { getPlaybookByShareId } from '@/lib/store';

type Props = {
  params: Promise<{ shareId: string }>;
};

export default async function Page(props: Props) {
  const { shareId } = await props.params;

  const userData = await getPlaybookByShareId(shareId);

  if (!userData) {
    return notFound();
  }

  let systemData;
  let playbookData;
  let playbookDefinition;

  try {
    systemData = SystemSchema.parse(getJson(userData.systemId, 'system'));
    playbookDefinition = PlaybookDefinitionSchema.parse(
      getJson(userData.systemId, userData.playbookType)
    );
    playbookData = PlaybookDataSchema.parse(
      getJson(userData.systemId, userData.playbookType, userData.playbookId)
    );
  } catch (e) {
    if (e instanceof NotFoundError) {
      return notFound();
    }

    throw e;
  }

  // don't give out the main ID when sharing
  delete userData.id;

  return (
    <PlaybookEditor
      systemData={systemData}
      playbookData={playbookData}
      playbookDefinition={playbookDefinition}
      userData={userData}
      readOnly
    />
  );
}
