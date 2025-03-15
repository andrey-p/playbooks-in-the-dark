import { getJson } from '@/lib/system-data';
import {
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  System as SystemSchema
} from '@/schemas';
import PlaybookEditor from './components/playbook-editor';
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
    systemData = SystemSchema.parse(getJson(systemId, 'system'));
    playbookData = PlaybookDataSchema.parse(getJson(systemId, playbookId));
    playbookDefinition = PlaybookDefinitionSchema.parse(
      getJson(systemId, playbookType)
    );
  } catch {
    return notFound();
  }

  return (
    <PlaybookEditor
      systemData={systemData}
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
