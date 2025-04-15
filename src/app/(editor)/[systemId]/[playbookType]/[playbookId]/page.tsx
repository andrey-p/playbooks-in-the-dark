import { z } from 'zod';
import { getJson } from '@/lib/system-data';
import { NotFoundError } from '@/lib/errors';
import {
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  System as SystemSchema,
  UserData as UserDataSchema
} from '@/schemas';
import PlaybookEditor from '../../../components/playbook-editor';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { savePlaybook } from '@/lib/store';

type UserDataType = z.infer<typeof UserDataSchema>;

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
  } catch (e) {
    if (e instanceof NotFoundError) {
      return notFound();
    }

    throw e;
  }

  const saveAction = async (userData: UserDataType) => {
    'use server';

    const result = await savePlaybook(userData);
    revalidatePath(`/${systemId}/${playbookType}/${playbookId}/${result.id}`);
    return result;
  };

  return (
    <PlaybookEditor
      systemData={systemData}
      playbookData={playbookData}
      playbookDefinition={playbookDefinition}
      saveAction={saveAction}
      userData={{
        id: undefined,
        playbookType,
        systemId: systemData.id,
        playbookId: playbookData.id,
        modules: {}
      }}
    />
  );
}
