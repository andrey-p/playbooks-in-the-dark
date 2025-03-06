import { getJson } from '@/lib/system-data';
import CharacterPlaybook from '../components/playbook';
import type { UserCharacterData } from '@/types';
import { getCharacter } from '@/lib/store';

type Props = {
  params: Promise<{
    playbook: string,
    id: string
  }>
};

export default async function Page(props: Props) {
  const { playbook, id } = await (props.params);

  const playbookData = getJson('bitd', playbook);
  const systemData = getJson('bitd', 'system');

  const data = await getCharacter(id);

  return (
    <CharacterPlaybook
      playbookData={playbookData}
      systemData={systemData}
      userCharacterData={data as UserCharacterData}
    />
  );
}
