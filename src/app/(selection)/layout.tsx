import styles from './layout.module.css';
import Attribution from './components/attribution';
import FooterLinks from './components/footer-links';
import { useTranslations } from 'next-intl';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading} aria-label='Playbooks in the Dark'></h1>
        <div className={styles.subheading}>
          {t('UI.Global.modularCharacterBuilder')}
          <br />
          <span className={styles.highlight}>
            {t('UI.Global.currentlyInAlpha')}
          </span>
        </div>
      </div>
      {children}
      <footer className={styles.footer}>
        <Attribution />
        <FooterLinks />
      </footer>
    </div>
  );
}
