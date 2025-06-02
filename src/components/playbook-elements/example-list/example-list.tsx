import styles from './example-list.module.css';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

type Props = {
  items: string[];
};

export default function ExampleList(props: Props) {
  const { items } = props;
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li className={clsx(styles.item)} key={item}>
            {t(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
