import styles from './example-list.module.css';
import clsx from 'clsx';

type Props = {
  items: string[],
  selectable?: boolean,
  selectedItems?: string[],
  onItemSelected?: (item: string, selected: boolean) => void
};

export default function ExampleList(props: Props) {
  const {
    items,
    onItemSelected,
    selectable,
    selectedItems = []
  } = props;

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map(item => {
          const selected = selectedItems.includes(item);

          return (
            <li
              className={clsx(
                styles.item,
                selectable && styles.selectable,
                selected && styles.selected
              )}
              key={item}
              onClick={() => {
                if (onItemSelected) {
                  onItemSelected(item, !selected);
                }
              }}
            >{item}</li>
          );
        })}
      </ul>
    </div>
  );
}
