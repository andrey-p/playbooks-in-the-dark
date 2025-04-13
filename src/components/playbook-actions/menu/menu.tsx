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

      {userData.id && (
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <CopyMenuItem userDataId={userData.id} />
          </li>
          <li className={styles.menuItem}>
            <DeleteMenuItem userDataId={userData.id} />
          </li>
        </ul>
      )}

      <h3 className={styles.explainerHeading}>How does saving work?</h3>
      <p className={styles.explainerP}>
        The first time you save a playbook, it gets assigned an ID, and you can
        share it to other devices or your friends and enemies.
      </p>
      <p className={styles.explainerP}>
        The linked playbooks on the homepage are stored in your browser&apos;s
        local storage.
      </p>
      <p className={styles.explainerP}>
        There is currently no way to assert ownership of a saved playbook. For
        now, anyone with the link can edit or, yes, delete your playbook.
      </p>
      <p className={styles.explainerP}>
        Hate this? Go and shout at Andrey{' '}
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
