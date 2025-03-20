import { z } from 'zod';
import Link from 'next/link';
import { getJson } from '@/lib/system-data';
import {
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  System as SystemSchema
} from '@/schemas';
import { notFound } from 'next/navigation';
import OptionList from '../../components/option-list';
import Separator from '../../components/separator';
import type { Option as OptionType } from '../../components/options.types';
import styles from './page.module.css';

type PlaybookDefinitionType = z.infer<typeof PlaybookDefinitionSchema>;

type Props = {
  params: Promise<{ systemId: string }>;
};

export default async function Page(props: Props) {
  const { systemId } = await props.params;

  let systemData;
  const playbookDefinitions: PlaybookDefinitionType[] = [];
  const playbooksByType: Record<string, OptionType[]> = {};

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
        playbooksByType[type].push({
          id: playbookId,
          href: `/${systemId}/${type}/${playbookData.id}`,
          name: playbookData.name,
          description: playbookData.description
        });
      });
    });
  } catch {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <Separator />
      <div className={styles.systemBlurb}>
        <h2 className={styles.heading}>{systemData.name}</h2>
        <p>{systemData.description}</p>
      </div>
      <Separator />

      {playbookDefinitions.map((playbookDefinition: PlaybookDefinitionType) => (
        <div key={playbookDefinition.id}>
          <OptionList
            heading={`Make a ${playbookDefinition.name}`}
            options={playbooksByType[playbookDefinition.id]}
          />
          <div className={styles.or}>or</div>
        </div>
      ))}

      <Link className={styles.goBack} href='/'>
        ◂ Go back
      </Link>
    </div>
  );
}
