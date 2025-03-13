'use client';

import { useReducer } from 'react';
import { z } from 'zod';
import {
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  UserData as UserDataSchema
} from '@/schemas';
import ModuleRenderer from '@/components/playbook-modules/renderer';
import { userDataReducer } from '@/reducers';
import SaveAction from '@/components/playbook-actions/save';

type PlaybookDefinitionType = z.infer<typeof PlaybookDefinitionSchema>;
type PlaybookDataType = z.infer<typeof PlaybookDataSchema>;
type UserDataType = z.infer<typeof UserDataSchema>;

import { getEnvVar } from '@/lib/env';
import { savePlaybook } from '@/lib/store';

type Props = {
  playbookData: PlaybookDataType;
  playbookDefinition: PlaybookDefinitionType;
  userData: UserDataType;
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
