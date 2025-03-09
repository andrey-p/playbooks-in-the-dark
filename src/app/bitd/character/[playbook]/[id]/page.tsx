import { getJson } from '@/lib/system-data';
import CharacterPlaybook from '../components/playbook';
import type {
  CharacterPlaybook as CharacterPlaybookType,
  SystemCharacters as SystemCharactersType
} from '@/types';
import { getCharacter } from '@/lib/store';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    playbook: string;
    id: string;
  }>;
};

export default async function Page(props: Props) {
  const { playbook, id } = await props.params;

  const playbookData = getJson('bitd', playbook) as CharacterPlaybookType;
  const systemCharactersData = getJson(
    'bitd',
    'characters'
  ) as SystemCharactersType;

  const data = await getCharacter(id);

  if (!data) {
    return notFound();
  }

  // this should really only happen if someone's mucking about with the URLs
  if (data.systemId !== 'bitd' || data.playbookId !== playbook) {
    return notFound();
  }

  return (
    <CharacterPlaybook
      playbookData={playbookData}
      systemCharactersData={systemCharactersData}
      userData={data}
    />
  );
}
