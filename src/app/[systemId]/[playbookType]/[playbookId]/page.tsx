import { getJson } from '@/lib/system-data';
import type {
  PlaybookData as PlaybookDataType,
  PlaybookDefinition as PlaybookDefinitionType,
  System as SystemType
} from '@/types';
import PlaybookEditor from './components/playbook';
import { notFound } from 'next/navigation';

type Params = {
  systemId: string;
  playbookType: string;
  playbookId: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function Page(props: Props) {
  const { playbookId, systemId, playbookType } = await props.params;

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

  return (
    <PlaybookEditor
      playbookData={playbookData}
      playbookDefinition={playbookDefinition}
      userData={{
        id: undefined,
        playbookType,
        systemId: systemData.id,
        playbookId: playbookData.id
      }}
    />
  );
}
