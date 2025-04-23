import {
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  System as SystemSchema,
  UserData as UserDataSchema
} from '@/schemas';

import { z } from 'zod';
import { getJson } from '@/lib/system-data';
import { NotFoundError } from '@/lib/errors';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

type UserDataType = z.infer<typeof UserDataSchema>;
type SystemType = z.infer<typeof SystemSchema>;
type PlaybookDefinitionType = z.infer<typeof PlaybookDefinitionSchema>;
type PlaybookDataType = z.infer<typeof PlaybookDataSchema>;

type EditorData = {
  systemData: SystemType;
  playbookDefinition: PlaybookDefinitionType;
  playbookData: PlaybookDataType;
};

type Props = {
  systemId: string;
  playbookType: string;
  playbookId: string;
  userData?: UserDataType;
  children: (datas: EditorData) => React.JSX.Element;
};

export default async function DataWrapper(props: Props) {
  const { systemId, playbookType, playbookId, userData, children } = props;

  let systemData;
  let playbookData;
  let playbookDefinition;

  try {
    systemData = SystemSchema.parse(getJson(systemId, 'system'));
    playbookDefinition = PlaybookDefinitionSchema.parse(
      getJson(systemId, playbookType)
    );
    playbookData = PlaybookDataSchema.parse(
      getJson(systemId, playbookType, playbookId)
    );
  } catch (e) {
    if (e instanceof NotFoundError) {
      return notFound();
    }

    throw e;
  }

  // this should really only happen if someone's mucking about with the URLs
  if (
    userData &&
    (userData.systemId !== systemData.id ||
      userData.playbookId !== playbookId ||
      userData.playbookType !== playbookDefinition.id)
  ) {
    return notFound();
  }

  // get system-specific translation strings for this locale
  const locale = getLocale();
  const uiMessages = (await import(`@/../lang/${locale}.json`)).default;
  const systemMessages = (
    await import(`@/systems/${systemId}/lang/${locale}.json`)
  ).default;

  return (
    <NextIntlClientProvider
      messages={{
        ...uiMessages,
        ...systemMessages
      }}
    >
      {children({
        systemData,
        playbookData,
        playbookDefinition
      })}
    </NextIntlClientProvider>
  );
}
