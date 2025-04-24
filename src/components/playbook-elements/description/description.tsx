import styles from './description.module.css';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

type Props = {
  text: string;
};

// a utility component that renders very basic markup in text
export default function Description(props: Props) {
  const { text } = props;
  const t = useTranslations();

  return (
    <div className={clsx(styles.container, 'description')}>
      {t.rich(text, {
        p: (chunks) => <p>{chunks}</p>,
        ul: (chunks) => <ul>{chunks}</ul>,
        li: (chunks) => <li>{chunks}</li>,
        strong: (chunks) => <strong>{chunks}</strong>,
        em: (chunks) => <em>{chunks}</em>
      })}
    </div>
  );
}
