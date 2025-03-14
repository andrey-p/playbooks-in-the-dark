import { z } from 'zod';
import PropsSchema, { Item as ItemSchema } from './items.schema';
import Item from './item';
import RadioGroup from '@/components/radio-group/radio-group';
import ModuleWrapper from '../layout/module-wrapper';
import styles from './items.module.css';
import clsx from 'clsx';

type Props = z.infer<typeof PropsSchema>;
type ItemType = z.infer<typeof ItemSchema>;

export default function ItemList(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps } = props;
  const { common, load, twoColumns } = moduleDefinition.props;
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
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      {load && (
        <div className={styles.load}>
          <RadioGroup
            options={load}
            selected={selectedLoad || null}
            type='rhombus'
            onValueSelect={onLoadSelect}
          />
        </div>
      )}
      <ul className={styles.list}>
        {common.map((item: ItemType) => (
          <li
            className={clsx(styles.item, twoColumns && styles.twoColumnsItem)}
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
      <ul className={styles.list}>
        {playbookProps?.custom?.map((item: ItemType) => (
          <li
            className={clsx(styles.item, twoColumns && styles.twoColumnsItem)}
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
    </ModuleWrapper>
  );
}
