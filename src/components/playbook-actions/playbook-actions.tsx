import { useState, useCallback } from 'react';
import { z } from 'zod';
import clsx from 'clsx';
import styles from './playbook-actions.module.css';
import IconButton from '@/components/icon-button/icon-button';
import Menu from '../menu/menu';

import { FiSave, FiMenu } from 'react-icons/fi';

import { UserData as UserDataSchema } from '@/schemas';
type UserDataType = z.infer<typeof UserDataSchema>;

type Props = {
  savePlaybook: () => Promise<void>;
  deletePlaybook: () => Promise<void>;
  isSaved: boolean;
  userData: UserDataType;
  readOnly?: boolean;
};

export default function PlaybookActions(props: Props) {
  const { isSaved, savePlaybook, userData, readOnly, deletePlaybook } = props;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const onMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        {!readOnly && (
          <div className={clsx(!isSaved && styles.notSaved)}>
            <IconButton
              onClick={savePlaybook}
              label={isSaved ? 'Save' : 'Save (you have unsaved changes)'}
              icon={<FiSave />}
            />
          </div>
        )}
        <IconButton
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            setIsMenuOpen(true);
          }}
          icon={<FiMenu />}
          label='Open menu'
        />
      </div>
      <Menu
        userData={userData}
        open={isMenuOpen}
        onClose={onMenuClose}
        deletePlaybook={deletePlaybook}
      />
    </div>
  );
}
