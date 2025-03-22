import { useState } from 'react';
import BaseMenuItem from './base-menu-item';
import styles from './delete-menu-item.module.css';

import { deletePlaybook as deletePlaybookFromDb } from '@/lib/store';
import { deletePlaybook as deletePlaybookFromLocalStorage } from '@/lib/local-storage';

import { useRouter } from 'next/navigation';

type Props = {
  userDataId: string;
};

export default function DeleteMenuItem(props: Props) {
  const { userDataId } = props;
  const [showingConfirm, setShowingConfirm] = useState<boolean>(false);
  const router = useRouter();

  const onYesClick = async () => {
    await deletePlaybookFromDb(userDataId);
    deletePlaybookFromLocalStorage(userDataId);

    router.push('/');
  };

  return (
    <BaseMenuItem
      onClick={() => setShowingConfirm(true)}
      secondaryContent={(
        <>
          Are you sure? This is irreversible.
          <div>
            <button className={styles.confirmBtn} onClick={onYesClick}>YES</button>
            <button className={styles.confirmBtn} onClick={() => setShowingConfirm(false)}>NO</button>
          </div>
        </>
      )}
      showSecondaryContent={showingConfirm}
    >
     Delete playbook
   </BaseMenuItem>
  );
}
