import styles from './base-menu-item.module.css';
import clsx from 'clsx';
import { useId } from 'react';

type Props = {
  buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: React.ReactNode;
  secondaryContent?: React.ReactNode;
  showSecondaryContent?: boolean;
};

export default function BaseMenuItem(props: Props) {
  const { children, buttonProps, secondaryContent, showSecondaryContent } =
    props;

  const consistentId = useId();

  return (
    <div className={styles.container}>
      <button
        className={styles.link}
        aria-controls={consistentId}
        aria-expanded={showSecondaryContent}
        {...buttonProps}
      >
        {children}
      </button>
      {secondaryContent && (
        <div
          id={consistentId}
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
