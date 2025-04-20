'use client';

import { useState, useReducer, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

import {
  PlaybookData as PlaybookDataSchema,
  PlaybookDefinition as PlaybookDefinitionSchema,
  UserData as UserDataSchema,
  System as SystemDataSchema
} from '@/schemas';
import ModuleRenderer from '@/components/renderer/renderer';
import RendererErrorBoundary from '@/components/renderer/renderer-error-boundary';

import { userDataReducer } from '@/reducers';
import PlaybookActions from '@/components/playbook-actions/playbook-actions';
import styles from './playbook-editor.module.css';

type SystemDataType = z.infer<typeof SystemDataSchema>;
type PlaybookDefinitionType = z.infer<typeof PlaybookDefinitionSchema>;
type PlaybookDataType = z.infer<typeof PlaybookDataSchema>;
type UserDataType = z.infer<typeof UserDataSchema>;

import {
  savePlaybook as savePlaybookToLocalStorage,
  deletePlaybook as deletePlaybookFromLocalStorage
} from '@/lib/local-storage';

type Props = {
  playbookData: PlaybookDataType;
  playbookDefinition: PlaybookDefinitionType;
  userData: UserDataType;
  systemData: SystemDataType;
  readOnly?: boolean;
  saveAction?: (userData: UserDataType) => Promise<UserDataType>;
  deleteAction?: (id: string) => Promise<void>;
};

export default function Playbook(props: Props) {
  const {
    userData: initialUserData,
    playbookData,
    playbookDefinition,
    systemData,
    saveAction,
    deleteAction,
    readOnly
  } = props;
  const [lastSaved, setLastSaved] = useState<string>(
    JSON.stringify(initialUserData)
  );
  const [userData, dispatch] = useReducer(userDataReducer, initialUserData);
  const pathName = usePathname();
  const router = useRouter();

  const save = useCallback(async () => {
    if (readOnly || !saveAction) {
      return;
    }

    const data = await saveAction(userData);

    const dataWithId = {
      ...userData,
      id: data.id,
      shareId: data.shareId
    };

    setLastSaved(JSON.stringify(dataWithId));

    // store this in local storage
    // so it can be accessed easily from the homepage
    savePlaybookToLocalStorage(dataWithId, playbookData, playbookDefinition);

    // if this is a new character being saved, store the newly created ID in local state
    if (!userData.id && data.id) {
      dispatch({ type: 'set_id', value: data.id });

      // set the URL so the user can refresh or copy / paste without losing their character
      window.history.replaceState(null, '', pathName + '/' + data.id);
    }

    // likewise if the data didn't have a share ID before
    if (!userData.shareId && data.shareId) {
      dispatch({ type: 'set_share_id', value: data.shareId });
    }
  }, [
    userData,
    playbookData,
    playbookDefinition,
    pathName,
    readOnly,
    saveAction
  ]);

  // after the first save, save automatically every 30s
  // (because of how the dependencies are constructed,
  // the timer will be reset with every change;
  // this is fine)
  useEffect(() => {
    if (!userData.id || readOnly) {
      return;
    }

    const interval = setInterval(() => {
      save();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [userData.id, save, readOnly]);

  const deletePlaybook = useCallback(async () => {
    if (!userData.id || !deleteAction) {
      return;
    }

    await deleteAction(userData.id);
    deletePlaybookFromLocalStorage(userData.id);

    router.push('/');
  }, [deleteAction, userData.id, router]);

  return (
    <div
      className={clsx(systemData.id, playbookDefinition.id, playbookData.id)}
    >
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
          deletePlaybook={deletePlaybook}
          userData={userData}
          readOnly={readOnly}
        />
      </header>

      <RendererErrorBoundary>
        <ModuleRenderer
          layout={playbookDefinition.layout}
          modules={playbookDefinition.modules}
          playbookData={playbookData}
          userData={userData}
          dispatch={readOnly ? () => {} : dispatch}
        />
      </RendererErrorBoundary>
    </div>
  );
}
