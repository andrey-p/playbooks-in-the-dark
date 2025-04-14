import { useEffect, useCallback, useRef } from 'react';
import { z } from 'zod';
import styles from './menu.module.css';
import Button from '../button';
import CopyMenuItem from './copy-menu-item';
import DeleteMenuItem from './delete-menu-item';

import { UserData as UserDataSchema } from '@/schemas';

import { FiX } from 'react-icons/fi';

type UserDataType = z.infer<typeof UserDataSchema>;
type Props = {
  userData: UserDataType;
  onClose: () => void;
};

export default function Menu(props: Props) {
  const { userData, onClose } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  // close on click out

  const onBodyClick = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, [onBodyClick]);

  return (
    <div className={styles.container} ref={containerRef}>
      <h2 className={styles.heading}>
        Play
        <br />
        books
        <br />
        in the
        <br />
        Dark
      </h2>
      <div className={styles.closeBtn}>
        <Button onClick={onClose} label='Close menu' icon={<FiX />} />
      </div>

      {(userData.id || userData.shareId) && (
        <ul className={styles.menuList}>
          {userData.id && (
            <li className={styles.menuItem}>
              <CopyMenuItem
                text='Copy editable link'
                path={`${userData.systemId}/${userData.playbookType}/${userData.playbookId}/${userData.id}`}
              />
            </li>
          )}
          {userData.shareId && (
            <li className={styles.menuItem}>
              <CopyMenuItem
                text='Copy read-only link'
                path={`share/${userData.shareId}`}
              />
            </li>
          )}
          {userData.id && (
            <li className={styles.menuItem}>
              <DeleteMenuItem userDataId={userData.id} />
            </li>
          )}
        </ul>
      )}

      <h3 className={styles.explainerHeading}>How does saving work?</h3>
      <p className={styles.explainerP}>
        After saving a playbook for the first time, you can copy either an
        editable link or a read-only link.
      </p>
      <p className={styles.explainerP}>
        The editable link allows anyone to update (and potentially delete!) your
        playbook. Only send it to your close allies and your inner circle.
      </p>
      <p className={styles.explainerP}>
        The read-only link allows anyone to look at, but not mess with, your
        playbook. Send it to acquaintances and potential turncoats.
      </p>
      <p className={styles.explainerP}>
        The linked playbooks on the homepage are stored in your browser&apos;s
        local storage.
      </p>
      <p className={styles.explainerP}>
        There is currently no way to assert ownership of a saved playbook. Hate
        this? Go and shout at Andrey{' '}
        <a
          target='_blank'
          href='https://github.com/andrey-p/playbooks-in-the-dark'
        >
          on Github
        </a>{' '}
        so it gets moved up the development roadmap.
      </p>
    </div>
  );
}
