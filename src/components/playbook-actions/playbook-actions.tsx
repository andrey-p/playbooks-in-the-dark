import { useState, useCallback } from 'react';
import clsx from 'clsx';
import styles from './playbook-actions.module.css';
import Button from './button';
import Menu from './menu/menu';

import { FiSave, FiMenu, FiCopy } from 'react-icons/fi';

type Props = {
  savePlaybook: () => void;
  isSaved: boolean;
  userDataId?: string;
};

export default function PlaybookActions(props: Props) {
  const { isSaved, savePlaybook, userDataId } = props;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const onMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div className={clsx(!isSaved && styles.notSaved)}>
          <Button onClick={savePlaybook} label={
            isSaved ? 'Save' : 'Save (you have unsaved changes)'
          }icon={<FiSave />} />
        </div>
        {userDataId && (
          <Button
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              setIsMenuOpen(true);
            }}
            icon={<FiMenu />}
            label='Open menu'
          />
        )}
      </div>
      {isMenuOpen && userDataId && (
        <Menu
          userDataId={userDataId}
          onClose={onMenuClose}
        />
      )}
    </div>
  );
}
