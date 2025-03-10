import { z } from 'zod';
import PropsSchema, { TraumaItem as TraumaItemSchema } from './trauma.schema';
import SimpleTracker from '@/components/trackers/simple-tracker';
import { toggleArrayEntry } from '@/lib/utils';
import ExampleList from '@/components/example-list/example-list';

type TraumaItemType = z.infer<typeof TraumaItemSchema>;
type Props = z.infer<typeof PropsSchema>;

export default function Trauma(props: Props) {
  const { moduleDefinition, userValue: selectedTraumas, onUpdate } = props;
  const { props: moduleProps, label } = moduleDefinition;

  const onItemSelect = (itemId: string, selected: boolean) => {
    const nextSelectedItems = toggleArrayEntry(
      itemId,
      selected,
      selectedTraumas
    );
    onUpdate(nextSelectedItems);
  };

  const options = moduleProps.options.map(
    (option: TraumaItemType) => option.name
  );

  return (
    <div>
      <h3>{label}</h3>
      <div>
        <SimpleTracker value={selectedTraumas.length} max={4} type='dagger' />
        <ExampleList
          items={options}
          selectable
          selectedItems={selectedTraumas}
          onItemSelected={onItemSelect}
        />
      </div>
    </div>
  );
}
