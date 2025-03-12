import { z } from 'zod';
import PropsSchema, { Item as ItemSchema } from './items.schema';
import Item from './item';
import RadioGroup from '@/components/radio-group/radio-group';

type Props = z.infer<typeof PropsSchema>;
type ItemType = z.infer<typeof ItemSchema>;

export default function ItemList(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps = [] } = props;
  const { common, load } = moduleDefinition.props;
  const { items: selectedItems, load: selectedLoad } = userValue;

  const onItemSelect = (itemId: string, selected: number) => {
    onUpdate({
      items: {
        ...selectedItems,
        [itemId]: selected
      },
      load: selectedLoad
    });
  };

  const onLoadSelect = (loadId: string | null) => {
    onUpdate({
      items: selectedItems,
      load: loadId
    });
  };

  return (
    <div>
      <h3>{moduleDefinition.label}</h3>

      {load && (
        <RadioGroup
          options={load}
          selected={selectedLoad || null}
          onValueSelect={onLoadSelect}
        />
      )}
      <ul>
        {common.map((item: ItemType) => (
          <li key={item.id}>
            <Item
              item={item}
              selected={selectedItems[item.id]}
              onSelect={(selected) => onItemSelect(item.id, selected)}
            />
          </li>
        ))}
        {playbookProps.map((item: ItemType) => (
          <li key={item.id}>
            <Item
              item={item}
              selected={selectedItems[item.id]}
              onSelect={(selected) => onItemSelect(item.id, selected)}
            />
          </li>
        ))}
      </ul>

      {moduleDefinition.description && (
        <div
          dangerouslySetInnerHTML={{ __html: moduleDefinition.description }}
        />
      )}
    </div>
  );
}
