import { redirect } from 'next/navigation';
import { getCharacter } from '@/lib/store';

type Props = {
  params: Promise<{ id: string }>
};

export default async function Page(props: Props) {
  const { id } = await props.params;

  const data = await getCharacter(id);
  console.log(id);

  // TODO error for no data?
  // TODO loading state?

  redirect(`/${data.systemId}/character/${data.playbookId}/${id}`);
}
