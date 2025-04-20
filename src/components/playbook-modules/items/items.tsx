import { z } from 'zod';
import PropsSchema from './items.schema';
import { SlotValue as SlotValueSchema } from '@/components/slotted-text/slotted-text.schema';
import RadioGroup from '@/components/radio-group/radio-group';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';
import styles from './items.module.css';
import ItemList from './item-list';

type Props = z.infer<typeof PropsSchema>;
type SlotValueType = z.infer<typeof SlotValueSchema>;

export default function Items(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps } = props;
  const { common, load, twoColumns, groups } = moduleDefinition.props;
  const { load: selectedLoad, slots: slotValues } = userValue;
  let { items: selectedItems } = userValue;

  // add any preselected items for the playbook
  if (playbookProps?.startingItems) {
    selectedItems = Object.assign(playbookProps.startingItems, selectedItems);
  }

  const onItemSelect = (itemId: string, selected: number) => {
    onUpdate({
      slots: slotValues,
      items: {
        ...selectedItems,
        [itemId]: selected
      },
      load: selectedLoad
    });
  };

  const onLoadSelect = (loadId: string | null) => {
    onUpdate({
      slots: slotValues,
      items: selectedItems,
      load: loadId
    });
  };

  const onSlotUpdate = (newSlots: SlotValueType) => {
    onUpdate({
      items: selectedItems,
      load: selectedLoad,
      slots: newSlots
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
          slotValues={slotValues || {}}
          onSlotUpdate={onSlotUpdate}
          twoColumns={twoColumns}
        />
      )}
      {common.length && (
        <ItemList
          items={common}
          groups={groups}
          twoColumns={twoColumns}
          selectedItems={selectedItems}
          slotValues={slotValues || {}}
          onSlotUpdate={onSlotUpdate}
          onItemSelect={onItemSelect}
        />
      )}
    </ModuleWrapper>
  );
}
