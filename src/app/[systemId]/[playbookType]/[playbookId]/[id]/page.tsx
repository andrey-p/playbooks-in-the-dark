import { getJson } from '@/lib/system-data';
import CharacterPlaybook from '../components/playbook';
import type {
  System as SystemType,
  PlaybookData as PlaybookDataType,
  PlaybookDefinition as PlaybookDefinitionType
} from '@/types';
import { getCharacter } from '@/lib/store';
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
    systemData = getJson(systemId, 'system') as SystemType;
    playbookData = getJson(systemId, playbookId) as PlaybookDataType;
    playbookDefinition = getJson(
      systemId,
      playbookType
    ) as PlaybookDefinitionType;
  } catch {
    return notFound();
  }

  const data = await getCharacter(id);

  if (!data) {
    return notFound();
  }

  // this should really only happen if someone's mucking about with the URLs
  if (data.systemId !== systemData.id || data.playbookId !== playbookId) {
    return notFound();
  }

  return (
    <CharacterPlaybook
      playbookData={playbookData}
      playbookDefinition={playbookDefinition}
      userData={data}
    />
  );
}
