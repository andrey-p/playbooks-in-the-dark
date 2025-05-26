import styles from './harm-item.module.css';
import { useId } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  harmText?: string;
  column: number;
  level: number;
  onUpdate: (level: number, column: number, text: string) => void;
};

export default function HarmItem(props: Props) {
  const { harmText, onUpdate, level, column } = props;
  const t = useTranslations();

  const consistentId = useId();

  return (
    <input
      className={styles.input}
      type='text'
      aria-label={t('UI.ModulesShared.harmLabel', {
        level: level + 1,
        column: column + 1
      })}
      value={harmText || ''}
      id={consistentId}
      name={consistentId}
      onChange={(e) => onUpdate(level, column, e.currentTarget.value)}
    />
  );
}
