import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './playbook-actions.module.css';
import Button from './button';
import { getEnvVar } from '@/lib/env';

import { FiSave, FiCopy } from 'react-icons/fi';

type Props = {
  savePlaybook: () => void;
  isSaved: boolean;
  userDataId?: string;
};

export default function PlaybookActions(props: Props) {
  const { isSaved, savePlaybook, userDataId } = props;
  const [statusText, setStatusText] = useState<string>('');

  useEffect(() => {
    setStatusText(isSaved ? 'Saved' : 'Not saved');
  }, [isSaved]);

  const copyLink = async () => {
    const baseUrl = await getEnvVar('APP_URL');
    const shareableUrl = `${baseUrl}/share/${userDataId}`;
    await navigator.clipboard.writeText(shareableUrl);

    setStatusText('Copied shareable link');
  };

  return (
    <div className={styles.container}>
      <div
        className={clsx(
          styles.statusText,
          statusText === 'Not saved' && styles.statusNotSaved
        )}
      >
        {statusText}
      </div>
      <div className={styles.buttons}>
        <Button onClick={savePlaybook} label='Save' icon={<FiSave />} />
        {userDataId && (
          <Button
            onClick={copyLink}
            label='Copy shareable link'
            icon={<FiCopy />}
          />
        )}
      </div>
    </div>
  );
}
