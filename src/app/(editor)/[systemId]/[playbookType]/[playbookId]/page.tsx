import { z } from 'zod';
import { UserData as UserDataSchema } from '@/schemas';
import PlaybookEditor from '../../../components/playbook-editor';
import DataWrapper from '../../../components/data-wrapper';
import { revalidatePath } from 'next/cache';
import { savePlaybook, deletePlaybook } from '@/lib/store';

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
    >
      {(data) => (
        <PlaybookEditor
          {...data}
          saveAction={saveAction}
          deleteAction={deleteAction}
          userData={{
            id: undefined,
            playbookType,
            systemId: systemId,
            playbookId: playbookId,
            modules: {}
          }}
        />
      )}
    </DataWrapper>
  );
}
