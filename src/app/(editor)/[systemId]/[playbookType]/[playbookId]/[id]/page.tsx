import { z } from 'zod';
import { getJson } from '@/lib/system-data';
import { NotFoundError } from '@/lib/errors';
import PlaybookEditor from '../../../../components/playbook-editor';
import {
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  System as SystemSchema,
  UserData as UserDataSchema
} from '@/schemas';
import { getPlaybook } from '@/lib/store';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { savePlaybook, deletePlaybook } from '@/lib/store';

type UserDataType = z.infer<typeof UserDataSchema>;

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

  const data = await getPlaybook(id);

  if (!data) {
    return notFound();
  }

  // this should really only happen if someone's mucking about with the URLs
  if (data.systemId !== systemData.id || data.playbookId !== playbookId) {
    return notFound();
  }

  const saveAction = async (userData: UserDataType) => {
    'use server';

    const result = await savePlaybook(userData);
    revalidatePath(`/${systemId}/${playbookType}/${playbookId}/${result.id}`);
    return result;
  };

  const deleteAction = async (id: string) => {
    'use server';

    await deletePlaybook(id);
    revalidatePath(`/${systemId}/${playbookType}/${playbookId}/${id}`);
  };

  return (
    <PlaybookEditor
      systemData={systemData}
      playbookData={playbookData}
      playbookDefinition={playbookDefinition}
      saveAction={saveAction}
      deleteAction={deleteAction}
      userData={data}
    />
  );
}
