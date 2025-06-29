import styles from './base-menu-item.module.css';
import clsx from 'clsx';
import { useId, JSX } from 'react';

type Props = {
  buttonProps: JSX.IntrinsicElements['button'];
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
        aria-controls={secondaryContent ? consistentId : undefined}
        aria-expanded={secondaryContent ? showSecondaryContent : undefined}
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
