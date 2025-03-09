'use client';

import { useReducer } from 'react';
import type { UserData, CharacterPlaybook, SystemCharacters } from '@/types';
import ModuleRenderer from '@/components/playbook-modules/renderer';
import { userDataReducer } from '@/reducers';
import SaveAction from '@/components/playbook-actions/save';

import { getEnvVar } from '@/lib/env';
import { saveCharacter } from '@/lib/store';

type Props = {
  playbookData: CharacterPlaybook;
  systemCharactersData: SystemCharacters;
  userData: UserData;
};

export default function Playbook(props: Props) {
  const {
    userData: initialUserData,
    playbookData,
    systemCharactersData
  } = props;
  const [userData, dispatch] = useReducer(userDataReducer, initialUserData);

  const savePlaybook = async () => {
    const data = await saveCharacter(userData);
    const baseUrl = await getEnvVar('APP_URL');

    return {
      shareableUrl: `${baseUrl}/share/${data.id}`
    };
  };

  return (
    <div>
      {playbookData.id}

      {
        <ModuleRenderer
          layout={systemCharactersData.layout}
          modules={systemCharactersData.modules}
          playbookData={playbookData}
          userData={userData}
          dispatch={dispatch}
        />
      }

      <SaveAction savePlaybook={savePlaybook} />
    </div>
  );
}
