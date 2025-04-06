import { getJson } from '@/lib/system-data';
import { NotFoundError } from '@/lib/errors';
import PlaybookEditor from '../components/playbook-editor';
import {
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  System as SystemSchema
} from '@/schemas';
import { getPlaybook } from '@/lib/store';
import { notFound } from 'next/navigation';

type Params = {
  id: string;
  systemId: string;
  playbookType: string;
  playbookId: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function Page(props: Props) {
  const { id, playbookId, systemId, playbookType } = await props.params;

  let systemData;
  let playbookData;
  let playbookDefinition;

  try {
    systemData = SystemSchema.parse(getJson(systemId, 'system'));
    playbookData = PlaybookDataSchema.parse(getJson(systemId, playbookId));
    playbookDefinition = PlaybookDefinitionSchema.parse(
      getJson(systemId, playbookType)
    );
  } catch (e) {
    if (e instanceof NotFoundError) {
      return notFound();
    }

    throw e;
  }

  const data = await getPlaybook(id);

  if (!data) {
    return notFound();
  }

  // this should really only happen if someone's mucking about with the URLs
  if (data.systemId !== systemData.id || data.playbookId !== playbookId) {
    return notFound();
  }

  return (
    <PlaybookEditor
      systemData={systemData}
      playbookData={playbookData}
      playbookDefinition={playbookDefinition}
      userData={data}
    />
  );
}
