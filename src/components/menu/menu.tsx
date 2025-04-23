import { useEffect, useCallback, useRef, useContext } from 'react';
import { z } from 'zod';
import styles from './menu.module.css';
import IconButton from '@/components/icon-button/icon-button';
import CopyMenuItem from './copy-menu-item';
import DeleteMenuItem from './delete-menu-item';
import clsx from 'clsx';
import Link from 'next/link';
import { ThemeContext } from '@/context';

import { UserData as UserDataSchema } from '@/schemas';

import { FiX, FiGithub, FiSun, FiMoon } from 'react-icons/fi';

type UserDataType = z.infer<typeof UserDataSchema>;
type Props = {
  userData: UserDataType;
  open: boolean;
  deletePlaybook: () => Promise<void>;
  onClose: () => void;
};

export default function Menu(props: Props) {
  const { userData, onClose, open, deletePlaybook } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme } = useContext(ThemeContext.Context);

  // close on click out

  const onBodyClick = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  useEffect(() => {
    if (open) {
      document.body.addEventListener('click', onBodyClick);
    }

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, [onBodyClick, open]);

  return (
    <div
      className={clsx(styles.container, open && styles.open)}
      aria-hidden={!open}
      ref={containerRef}
    >
      <h2 className={styles.heading}>
        Play
        <br />
        books
        <br />
        in the
        <br />
        <span
          className={clsx(
            styles.darkLight,
            theme === 'light' && styles.lightTheme
          )}
        >
          <span className={styles.dark}>Dark</span>
          <span aria-hidden className={styles.light}>
            Light
          </span>
        </span>
      </h2>
      <div className={styles.btns}>
        <IconButton onClick={onClose} label='Close menu' icon={<FiX />} />

        <Link
          href='https://github.com/andrey-p/playbooks-in-the-dark'
          target='_blank'
        >
          <IconButton label='Github repository' icon={<FiGithub />} />
        </Link>

        <IconButton
          onClick={toggleTheme}
          label={
            theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
          }
          icon={theme === 'dark' ? <FiSun /> : <FiMoon />}
        />
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
              <DeleteMenuItem deletePlaybook={deletePlaybook} />
            </li>
          )}
        </ul>
      )}

      <h3 className={styles.explainerHeading}>How does saving work?</h3>
      <p className={styles.explainerP}>
        This project currently uses direct links to manage playbook ownership.
        Please read up on it{' '}
        <a href='/faq#saving' target='_blank'>
          in the FAQ
        </a>
        .
      </p>
    </div>
  );
}
