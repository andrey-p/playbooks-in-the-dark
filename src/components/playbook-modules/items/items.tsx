import { z } from 'zod';
import PropsSchema from './items.schema';
import RadioGroup from '@/components/radio-group/radio-group';
import ModuleWrapper from '../layout/module-wrapper';
import styles from './items.module.css';
import ItemList from './item-list';

type Props = z.infer<typeof PropsSchema>;

export default function Items(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps } = props;
  const { common, load, twoColumns, groups } = moduleDefinition.props;
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
            invertColours
            options={load}
            value={selectedLoad || null}
            type='rhombus'
            onValueSelect={onLoadSelect}
          />
        </div>
      )}
      {playbookProps?.custom?.length && (
        <ItemList
          items={playbookProps.custom}
          selectedItems={selectedItems}
          onItemSelect={onItemSelect}
          twoColumns={twoColumns}
        />
      )}
      {common.length && (
        <ItemList
          items={common}
          groups={groups}
          twoColumns={twoColumns}
          selectedItems={selectedItems}
          onItemSelect={onItemSelect}
        />
      )}
    </ModuleWrapper>
  );
}
