import { useEffect, useCallback, useRef, useContext } from 'react';
import { z } from 'zod';
import styles from './menu.module.css';
import IconButton from '@/components/icon-button/icon-button';
import CopyMenuItem from './copy-menu-item';
import DeleteMenuItem from './delete-menu-item';
import clsx from 'clsx';
import Link from 'next/link';
import { ThemeContext } from '@/context';
import { useTranslations } from 'next-intl';

import { UserData as UserDataSchema } from '@/schemas';

import { FiX, FiGithub, FiSun, FiMoon } from 'react-icons/fi';

type UserDataType = z.infer<typeof UserDataSchema>;
type Props = {
  userData: UserDataType;
  open: boolean;
  id: string;
  deletePlaybook: () => Promise<void>;
  onClose: () => void;
};

export default function Menu(props: Props) {
  const { id, userData, onClose, open, deletePlaybook } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('UI.Menu');

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
      id={id}
      className={clsx('menu', styles.container, open && styles.open)}
      role='menu'
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
      <div className={styles.btns} role='group'>
        <IconButton
          onClick={onClose}
          role='menuitem'
          label={t('closeMenu')}
          icon={<FiX />}
        />

        <Link
          href='https://github.com/andrey-p/playbooks-in-the-dark'
          target='_blank'
          role='menuitem'
          aria-label={t('githubRepository')}
        >
          <IconButton
            tabIndex={-1}
            label={t('githubRepository')}
            icon={<FiGithub />}
          />
        </Link>

        <IconButton
          onClick={toggleTheme}
          role='menuitem'
          label={
            theme === 'dark' ? t('switchToLightTheme') : t('switchToDarkTheme')
          }
          icon={theme === 'dark' ? <FiSun /> : <FiMoon />}
        />
      </div>

      {(userData.id || userData.shareId) && (
        <ul className={styles.menuList} role='group'>
          {userData.id && (
            <li className={styles.menuItem} role='menuitem'>
              <CopyMenuItem
                text={t('copyEditableLink')}
                path={`${userData.systemId}/${userData.playbookType}/${userData.playbookId}/${userData.id}`}
              />
            </li>
          )}
          {userData.shareId && (
            <li className={styles.menuItem} role='menuitem'>
              <CopyMenuItem
                text={t('copyReadOnlyLink')}
                path={`share/${userData.shareId}`}
              />
            </li>
          )}
          {userData.id && (
            <li className={styles.menuItem} role='menuitem'>
              <DeleteMenuItem deletePlaybook={deletePlaybook} />
            </li>
          )}
        </ul>
      )}

      <h3 className={styles.explainerHeading}>{t('howDoesSavingWork')}</h3>
      <p className={styles.explainerP}>
        {t.rich('savingExplainer', {
          a: (chunks) => (
            <a href='/faq#saving' target='_blank'>
              {chunks}
            </a>
          )
        })}
      </p>
    </div>
  );
}
