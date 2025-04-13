import { z } from 'zod';
import { Group as GroupSchema, Item as ItemSchema } from './items.schema';
import Item from './item';
import styles from './item-list.module.css';
import clsx from 'clsx';

type ItemType = z.infer<typeof ItemSchema>;
type GroupType = z.infer<typeof GroupSchema>;

type Props = {
  items: ItemType[];
  selectedItems: Record<string, number>;
  groups?: GroupType[];
  onItemSelect: (itemId: string, selected: number) => void;
  twoColumns?: boolean;
};

export default function ItemList(props: Props) {
  const { items, twoColumns, selectedItems, onItemSelect } = props;
  let { groups = [] } = props;

  groups = [
    ...groups,
    // ungrouped
    { id: undefined, name: '' }
  ];

  return (
    <div>
      {groups.map((group) => {
        const itemsForGroup = items.filter((item) => {
          return item.group === group.id;
        });

        return (
          <div
            key={group.id || ''}
            className={clsx(group.id && `group-${group.id}`)}
          >
            {group.name && <div className={styles.groupName}>{group.name}</div>}
            <ul className={clsx(styles.list, 'item-list')}>
              {itemsForGroup.map((item: ItemType) => (
                <li
                  className={clsx(
                    styles.item,
                    twoColumns && styles.twoColumnsItem
                  )}
                  key={item.id}
                >
                  <Item
                    item={item}
                    selected={selectedItems[item.id]}
                    onSelect={(selected) => onItemSelect(item.id, selected)}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
