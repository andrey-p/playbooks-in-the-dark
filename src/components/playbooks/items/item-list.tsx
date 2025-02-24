import type ItemType from '@/types/item';
import Item from './item';

type Props = {
  items: ItemType[]
};

export default function ItemList(props: Props) {
  const { items } = props;

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <Item item={item} />
        </li>
      ))}
    </ul>
  );
}
