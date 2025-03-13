import { z } from 'zod';
import { getJson } from '@/lib/system-data';
import {
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  System as SystemSchema
} from '@/schemas';
import { notFound } from 'next/navigation';
import PlaybookSelection from './components/playbook-selection';

type PlaybookDefinitionType = z.infer<typeof PlaybookDefinitionSchema>;
type PlaybookDataType = z.infer<typeof PlaybookDataSchema>;

type Props = {
  params: Promise<{ systemId: string }>;
};

export default async function Page(props: Props) {
  const { systemId } = await props.params;

  let systemData;
  const playbookDefinitions: PlaybookDefinitionType[] = [];
  const playbooksByType: Record<string, PlaybookDataType[]> = {};

  try {
    systemData = SystemSchema.parse(getJson(systemId, 'system'));

    systemData.playbookTypes.forEach((type) => {
      const definition = PlaybookDefinitionSchema.parse(
        getJson(systemId, type)
      );
      playbookDefinitions.push(definition);

      playbooksByType[type] = [];

      definition.playbooks.forEach((playbookId) => {
        const playbookData = PlaybookDataSchema.parse(
          getJson(systemId, playbookId)
        );
        playbooksByType[type].push(playbookData);
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
