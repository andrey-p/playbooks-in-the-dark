import { z } from 'zod';
import {
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  System as SystemSchema
} from '@/schemas';
import Link from 'next/link';

type PlaybookDefinitionType = z.infer<typeof PlaybookDefinitionSchema>;
type PlaybookDataType = z.infer<typeof PlaybookDataSchema>;
type SystemType = z.infer<typeof SystemSchema>;

type Props = {
  systemData: SystemType;
  playbookDefinitions: PlaybookDefinitionType[];
  playbooksByType: Record<string, PlaybookDataType[]>;
};

export default function PlaybookSelection(props: Props) {
  const { systemData, playbookDefinitions, playbooksByType } = props;

  console.log(props);

  return (
    <div>
      <h1>{systemData.name}</h1>
      Choose a playbook:
      {playbookDefinitions.map((playbookDefinition) => (
        <div key={playbookDefinition.id}>
          {playbookDefinition.name}

          {playbooksByType[playbookDefinition.id].length > 0 ? (
            <ul>
              {playbooksByType[playbookDefinition.id].map((playbook) => (
                <li key={playbook.id}>
                  <Link
                    href={`/${systemData.id}/${playbookDefinition.id}/${playbook.id}`}
                  >
                    {playbook.name}: {playbook.description}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Not available yet. Watch this space.</p>
          )}
        </div>
      ))}
      <ul></ul>
    </div>
  );
}
