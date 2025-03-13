import { redirect, notFound } from 'next/navigation';
import { getPlaybook } from '@/lib/store';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page(props: Props) {
  const { id } = await props.params;

  const data = await getPlaybook(id);

  if (!data) {
    return notFound();
  }

  redirect(`/${data.systemId}/${data.playbookType}/${data.playbookId}/${id}`);
}
