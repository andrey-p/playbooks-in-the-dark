import styles from './base-menu-item.module.css';
import clsx from 'clsx';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  secondaryContent?: React.ReactNode;
  showSecondaryContent?: boolean;
};

export default function BaseMenuItem(props: Props) {
  const { onClick, children, secondaryContent, showSecondaryContent } = props;

  return (
    <div className={styles.container}>
      <button onClick={onClick} className={styles.link}>
        {children}
      </button>
      {secondaryContent && (
        <div
          className={clsx(
            styles.secondaryContent,
            showSecondaryContent && styles.secondaryContentVisible
          )}
        >
          {secondaryContent}
        </div>
      )}
    </div>
  );
}
