import type ItemType from '@/types/item';
import Item from './item';

type Props = {
  items: ItemType[],
  selectedItems: string[],
  onItemSelect: (id: string, selected: boolean) => void
};

export default function ItemList(props: Props) {
  const { items, selectedItems, onItemSelect } = props;

  return (
    <ul>
      {items.map(item => (
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
