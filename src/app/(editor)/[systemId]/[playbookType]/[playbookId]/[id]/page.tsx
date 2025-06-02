import { z } from 'zod';
import { Metadata } from 'next';
import PlaybookEditor from '../../../../components/playbook-editor';
import DataWrapper from '../../../../components/data-wrapper';
import { UserData as UserDataSchema } from '@/schemas';
import { getPlaybook } from '@/lib/store';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { savePlaybook, deletePlaybook } from '@/lib/store';
import { getPlaybookEditorMetadata } from '@/lib/metadata';

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

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id, systemId, playbookType } = await props.params;

  return getPlaybookEditorMetadata(systemId, playbookType, id);
}

export default async function Page(props: Props) {
  const { id, playbookId, systemId, playbookType } = await props.params;

  const userData = await getPlaybook(id);

  if (!userData) {
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
    <DataWrapper
      systemId={systemId}
      playbookType={playbookType}
      playbookId={playbookId}
      userData={userData}
    >
      {(data) => (
        <PlaybookEditor
          {...data}
          saveAction={saveAction}
          deleteAction={deleteAction}
          userData={userData}
        />
      )}
    </DataWrapper>
  );
}
