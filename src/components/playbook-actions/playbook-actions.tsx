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

  const copyLink = async () => {
    const baseUrl = await getEnvVar('APP_URL');
    const shareableUrl = `${baseUrl}/share/${userDataId}`;
    await navigator.clipboard.writeText(shareableUrl);
  };

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
            onClick={copyLink}
            label='Copy shareable link'
            icon={<FiCopy />}
          />
        )}
      </div>
    </div>
  );
}
