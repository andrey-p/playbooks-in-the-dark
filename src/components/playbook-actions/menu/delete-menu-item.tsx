import { useState } from 'react';
import BaseMenuItem from './base-menu-item';
import styles from './delete-menu-item.module.css';

type Props = {
  deletePlaybook: () => Promise<void>;
};

export default function DeleteMenuItem(props: Props) {
  const { deletePlaybook } = props;
  const [showingConfirm, setShowingConfirm] = useState<boolean>(false);

  const onYesClick = async () => {
    await deletePlaybook();
  };

  return (
    <BaseMenuItem
      onClick={() => setShowingConfirm(true)}
      secondaryContent={
        <>
          Are you sure? This is irreversible.
          <div>
            <button className={styles.confirmBtn} onClick={onYesClick}>
              YES
            </button>
            <button
              className={styles.confirmBtn}
              onClick={() => setShowingConfirm(false)}
            >
              NO
            </button>
          </div>
        </>
      }
      showSecondaryContent={showingConfirm}
    >
      Delete playbook
    </BaseMenuItem>
  );
}
