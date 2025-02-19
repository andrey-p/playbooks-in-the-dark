import type Item from '@/types/item';
import ItemToggle from './item-toggle';
import styles from './item.module.css';

type Props = {
  item: Item
};

export default function Item(props: Props) {
  const { item } = props;

  return (
    <div className={styles.container}>
      <ItemToggle load={item.load} />
      <span className={item.load === 0 ? styles.noLoadItem : ''}>
        {item.name}
      </span>
    </div>
  );
}
