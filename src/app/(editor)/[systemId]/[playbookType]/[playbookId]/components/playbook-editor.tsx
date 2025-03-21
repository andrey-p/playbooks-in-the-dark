'use client';

import { useState, useReducer, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { usePathname } from 'next/navigation';

import {
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  UserData as UserDataSchema,
  System as SystemDataSchema
} from '@/schemas';
import ModuleRenderer from '@/components/playbook-modules/renderer';
import { userDataReducer } from '@/reducers';
import PlaybookActions from '@/components/playbook-actions/playbook-actions';
import styles from './playbook-editor.module.css';

type SystemDataType = z.infer<typeof SystemDataSchema>;
type PlaybookDefinitionType = z.infer<typeof PlaybookDefinitionSchema>;
type PlaybookDataType = z.infer<typeof PlaybookDataSchema>;
type UserDataType = z.infer<typeof UserDataSchema>;

import { savePlaybook as savePlaybookToDb } from '@/lib/store';
import { savePlaybook as savePlaybookToLocalStorage } from '@/lib/local-storage';

type Props = {
  playbookData: PlaybookDataType;
  playbookDefinition: PlaybookDefinitionType;
  userData: UserDataType;
  systemData: SystemDataType;
};

export default function Playbook(props: Props) {
  const {
    userData: initialUserData,
    playbookData,
    playbookDefinition,
    systemData
  } = props;
  const [lastSaved, setLastSaved] = useState<string>(
    JSON.stringify(initialUserData)
  );
  const [userData, dispatch] = useReducer(userDataReducer, initialUserData);
  const pathName = usePathname();

  const save = useCallback(async () => {
    const data = await savePlaybookToDb(userData);

    const dataWithId = {
      ...userData,
      id: data.id
    };

    setLastSaved(JSON.stringify(dataWithId));

    // store this in local storage
    // so it can be accessed easily from the homepage
    savePlaybookToLocalStorage(dataWithId, playbookData, playbookDefinition);

    // if this is a new character being saved, store the newly created ID in local state
    if (!userData.id && data.id) {
      dispatch({ type: 'set_value', key: 'id', value: data.id });

      // set the URL so the user can refresh or copy / paste without losing their character
      window.history.replaceState(null, '', pathName + '/' + data.id);
    }
  }, [userData, playbookData, playbookDefinition, pathName]);

  // after the first save, save automatically every 30s
  // (because of how the dependencies are constructed,
  // the timer will be reset with every change;
  // this is fine)
  useEffect(() => {
    if (!userData.id) { return; }

    const interval = setInterval(() => {
      save();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [userData.id, save]);

  return (
    <div className={systemData.id}>
      {systemData.customStyles && (
        <link
          rel='stylesheet'
          href={`/system-assets/${systemData.id}/${systemData.customStyles}`}
        />
      )}
      <header className={styles.header}>
        <h1 className={styles.heading}>{playbookData.name}</h1>
        <p className={styles.description}>{playbookData.description}</p>

        <PlaybookActions
          isSaved={JSON.stringify(userData) === lastSaved}
          savePlaybook={save}
          userDataId={userData.id}
        />
      </header>

      <ModuleRenderer
        layout={playbookDefinition.layout}
        modules={playbookDefinition.modules}
        playbookData={playbookData}
        userData={userData}
        dispatch={dispatch}
      />
    </div>
  );
}
