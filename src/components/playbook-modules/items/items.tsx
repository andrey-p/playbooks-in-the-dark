import { z } from 'zod';
import PropsSchema, { Item as ItemSchema } from './items.schema';
import { toggleArrayEntry } from '@/lib/utils';
import Item from './item';

type Props = z.infer<typeof PropsSchema>;
type ItemType = z.infer<typeof ItemSchema>;

export default function ItemList(props: Props) {
  const {
    moduleDefinition,
    userValue: selectedItems,
    onUpdate,
    playbookProps
  } = props;

  const onItemSelect = (itemId: string, selected: boolean) => {
    const nextSelectedItems = toggleArrayEntry(itemId, selected, selectedItems);
    onUpdate(nextSelectedItems);
  };

  return (
    <ul>
      {moduleDefinition.props.common.map((item: ItemType) => (
        <li key={item.id}>
          <Item
            item={item}
            selected={selectedItems.includes(item.id)}
            onSelect={(selected) => onItemSelect(item.id, selected)}
          />
        </li>
      ))}
      {playbookProps.map((item: ItemType) => (
        <li key={item.id}>
          <Item
            item={item}
            selected={selectedItems.includes(item.id)}
            onSelect={(selected) => onItemSelect(item.id, selected)}
          />
        </li>
      ))}
    </ul>
  );
}
