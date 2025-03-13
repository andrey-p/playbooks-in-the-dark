import { getJson } from '@/lib/system-data';
import type {
  PlaybookData as PlaybookDataType,
  PlaybookDefinition as PlaybookDefinitionType,
  System as SystemType
} from '@/types';
import { notFound } from 'next/navigation';
import PlaybookSelection from './components/playbook-selection';

type Props = {
  params: Promise<{ systemId: string }>;
};

export default async function Page(props: Props) {
  const { systemId } = await props.params;

  let systemData;
  const playbookDefinitions: PlaybookDefinitionType[] = [];
  const playbooksByType: Record<string, PlaybookDataType[]> = {};

  try {
    systemData = getJson(systemId, 'system') as SystemType;

    systemData.playbookTypes.forEach((type) => {
      const definition = getJson(systemId, type) as PlaybookDefinitionType;
      playbookDefinitions.push(definition);

      playbooksByType[type] = [];

      definition.playbooks.forEach((playbookId) => {
        playbooksByType[type].push(
          getJson(systemId, playbookId) as PlaybookDataType
        );
      });
    });
  } catch {
    return notFound();
  }

  return (
    <PlaybookSelection
      systemData={systemData}
      playbookDefinitions={playbookDefinitions}
      playbooksByType={playbooksByType}
    />
  );
}
