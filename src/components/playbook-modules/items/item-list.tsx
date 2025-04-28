import { z } from 'zod';
import { Group as GroupSchema, Item as ItemSchema } from './items.schema';
import { SlotValue as SlotValueSchema } from '@/components/playbook-elements/slotted-text/slotted-text.schema';
import Description from '@/components/playbook-elements/description/description';
import Item from './item';
import styles from './item-list.module.css';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

type ItemType = z.infer<typeof ItemSchema>;
type GroupType = z.infer<typeof GroupSchema>;
type SlotValueType = z.infer<typeof SlotValueSchema>;

type Props = {
  items: ItemType[];
  selectedItems: Record<string, number>;
  groups?: GroupType[];
  onItemSelect: (itemId: string, selected: number) => void;
  onSlotUpdate: (values: SlotValueType) => void;
  slotValues: SlotValueType;
  twoColumns?: boolean;
};

export default function ItemList(props: Props) {
  const {
    items,
    twoColumns,
    selectedItems,
    slotValues,
    onItemSelect,
    onSlotUpdate
  } = props;
  let { groups = [] } = props;
  const t = useTranslations();

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

        if (!itemsForGroup.length) {
          return null;
        }

        return (
          <div
            key={group.id || ''}
            className={clsx('group', group.id && `group-${group.id}`)}
          >
            {group.name && (
              <div
                className={clsx(
                  'group-name',
                  styles.groupName,
                  group.id && `group-${group.id}-name`
                )}
              >
                {t(group.name)}
              </div>
            )}
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
                    slotValues={slotValues}
                    onSlotUpdate={onSlotUpdate}
                    onSelect={(selected) => onItemSelect(item.id, selected)}
                  />
                </li>
              ))}
            </ul>
            {group.description && <Description text={group.description} />}
          </div>
        );
      })}
    </div>
  );
}
