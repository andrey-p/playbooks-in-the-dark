import styles from './attribution.module.css';
import { useTranslations } from 'next-intl';

export default function Attribution() {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <p
        className={styles.p}
        dangerouslySetInnerHTML={{
          __html: t.raw('UI.Global.bladesAttributionText')
        }}
      />
      <p className={styles.p}>{t('UI.Global.thisWebsiteAttributionText')}</p>
    </div>
  );
}
