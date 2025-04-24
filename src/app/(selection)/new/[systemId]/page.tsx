import { z } from 'zod';
import Link from 'next/link';
import { getJson } from '@/lib/system-data';
import { NotFoundError } from '@/lib/errors';
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
import { getTranslations } from 'next-intl/server';

type PlaybookDefinitionType = z.infer<typeof PlaybookDefinitionSchema>;

type Props = {
  params: Promise<{ systemId: string }>;
};

export default async function Page(props: Props) {
  const { systemId } = await props.params;
  const t = await getTranslations();

  let systemData;
  let playbookDefinitions: PlaybookDefinitionType[] = [];
  const playbooksByType: Record<string, OptionType[]> = {};

  try {
    systemData = SystemSchema.parse(await getJson(systemId, 'system'));

    playbookDefinitions = await Promise.all(
      systemData.playbookTypes.map(async (type) => {
        const definition = PlaybookDefinitionSchema.parse(
          await getJson(systemId, type)
        );

        playbooksByType[type] = await Promise.all(
          definition.playbooks.map(async (playbookId) => {
            const playbookData = PlaybookDataSchema.parse(
              await getJson(systemId, type, playbookId)
            );

            return {
              id: playbookId,
              href: `/${systemId}/${type}/${playbookData.id}`,
              name: t(playbookData.name),
              description:
                playbookData.description && t(playbookData.description)
            };
          })
        );

        return definition;
      })
    );
  } catch (e) {
    if (e instanceof NotFoundError) {
      return notFound();
    }

    throw e;
  }

  return (
    <div className={styles.container}>
      <Separator />
      <div className={styles.systemBlurb}>
        <h2 className={styles.heading}>{t(systemData.name)}</h2>
        {systemData.attribution && (
          <p className={styles.attribution}>{t(systemData.attribution)}</p>
        )}
        <p className={styles.p}>{t(systemData.description)}</p>
        <a href={systemData.website} target='_blank'>
          {t('UI.Selection.goToWebsite')}
        </a>
      </div>
      <Separator />

      {playbookDefinitions.map((playbookDefinition: PlaybookDefinitionType) => (
        <div key={playbookDefinition.id}>
          <OptionList
            heading={t(
              `${systemData.translationNamespace}.Playbooks.makeA.${playbookDefinition.id}`
            )}
            options={playbooksByType[playbookDefinition.id]}
          />
          <div className={styles.or}>{t('UI.Selection.or')}</div>
        </div>
      ))}

      <Link className={styles.goBack} href={`/new`}>
        {t('UI.Selection.goBack')}
      </Link>
    </div>
  );
}
