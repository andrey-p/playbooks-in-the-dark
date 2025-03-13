'use client';

import { useReducer } from 'react';
import type { UserData, PlaybookData, PlaybookDefinition } from '@/types';
import ModuleRenderer from '@/components/playbook-modules/renderer';
import { userDataReducer } from '@/reducers';
import SaveAction from '@/components/playbook-actions/save';

import { getEnvVar } from '@/lib/env';
import { savePlaybook } from '@/lib/store';

type Props = {
  playbookData: PlaybookData;
  playbookDefinition: PlaybookDefinition;
  userData: UserData;
};

export default function Playbook(props: Props) {
  const { userData: initialUserData, playbookData, playbookDefinition } = props;
  const [userData, dispatch] = useReducer(userDataReducer, initialUserData);

  const save = async () => {
    const data = await savePlaybook(userData);
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
          layout={playbookDefinition.layout}
          modules={playbookDefinition.modules}
          playbookData={playbookData}
          userData={userData}
          dispatch={dispatch}
        />
      }

      <SaveAction savePlaybook={save} />
    </div>
  );
}
