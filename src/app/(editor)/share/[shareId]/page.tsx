import { redirect, notFound } from 'next/navigation';
import { getPlaybookByShareId } from '@/lib/store';

type Props = {
  params: Promise<{ shareId: string }>;
};

export default async function Page(props: Props) {
  const { shareId } = await props.params;

  const data = await getPlaybookByShareId(shareId);

  if (!data) {
    return notFound();
  }

  redirect(`/${data.systemId}/${data.playbookType}/${data.playbookId}/${id}`);
}
