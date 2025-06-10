import { useState, useId } from 'react';
import BaseMenuItem from './base-menu-item';
import styles from './delete-menu-item.module.css';
import { useTranslations } from 'next-intl';

type Props = {
  deletePlaybook: () => Promise<void>;
};

export default function DeleteMenuItem(props: Props) {
  const { deletePlaybook } = props;
  const [showingConfirm, setShowingConfirm] = useState<boolean>(false);
  const t = useTranslations('UI.Menu');

  const consistentId = useId();

  const onYesClick = async () => {
    await deletePlaybook();
  };

  return (
    <BaseMenuItem
      buttonProps={{
        onClick: () => setShowingConfirm(true),
        'aria-haspopup': 'dialog'
      }}
      secondaryContent={
        <>
          <div role='dialog' aria-labelledby={consistentId}>
            <span id={consistentId}>{t('areYouSure')}</span>
            <div>
              <button className={styles.confirmBtn} onClick={onYesClick}>
                {t('yes')}
              </button>
              <button
                className={styles.confirmBtn}
                onClick={() => setShowingConfirm(false)}
              >
                {t('no')}
              </button>
            </div>
          </div>
        </>
      }
      showSecondaryContent={showingConfirm}
    >
      {t('deletePlaybook')}
    </BaseMenuItem>
  );
}
