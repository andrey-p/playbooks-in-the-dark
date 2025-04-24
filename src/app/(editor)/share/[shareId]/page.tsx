import { notFound } from 'next/navigation';
import PlaybookEditor from '../../components/playbook-editor';
import DataWrapper from '../../components/data-wrapper';
import { getPlaybookByShareId } from '@/lib/store';

type Props = {
  params: Promise<{ shareId: string }>;
};

export default async function Page(props: Props) {
  const { shareId } = await props.params;

  const userData = await getPlaybookByShareId(shareId);

  if (!userData) {
    return notFound();
  }

  // don't give out the main ID when sharing
  delete userData.id;

  return (
    <DataWrapper
      systemId={userData.systemId}
      playbookType={userData.playbookType}
      playbookId={userData.playbookId}
      userData={userData}
    >
      {(data) => <PlaybookEditor {...data} userData={userData} readOnly />}
    </DataWrapper>
  );
}
