import { useEffect, useCallback, useRef } from 'react';
import { getEnvVar } from '@/lib/env';
import styles from './menu.module.css';
import Button from '../button';

import { FiX } from 'react-icons/fi';

type Props = {
  userDataId: string;
  onClose: () => void;
};

export default function Menu(props: Props) {
  const { userDataId, onClose } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const copyLink = async () => {
    const baseUrl = await getEnvVar('APP_URL');
    const shareableUrl = `${baseUrl}/share/${userDataId}`;
    await navigator.clipboard.writeText(shareableUrl);
  };

  // close on click out

  const onBodyClick = useCallback((e: MouseEvent) => {
    if (!containerRef.current?.contains(e.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, [onBodyClick]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.closeBtn}>
        <Button onClick={onClose} label='Close menu' icon={<FiX />} /> 
      </div>

      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <CopyLinkMenuItem
            userDataId={userDataId}
          />
          <a href='#' className={styles.menuLink}>
            
          </a>
        </li>
      </ul>
    </div>
  );
}
