import { z } from 'zod';
import PropsSchema, { TraumaItem as TraumaItemSchema } from './trauma.schema';
import SimpleTracker from '@/components/trackers/simple-tracker';
import { toggleArrayEntry } from '@/lib/utils';
import ExampleList from '@/components/example-list/example-list';
import ModuleWrapper from '../layout/module-wrapper';
import styles from './trauma.module.css';

type TraumaItemType = z.infer<typeof TraumaItemSchema>;
type Props = z.infer<typeof PropsSchema>;

export default function Trauma(props: Props) {
  const {
    moduleDefinition,
    userValue: selectedTraumas,
    playbookProps,
    onUpdate
  } = props;
  const { props: moduleProps } = moduleDefinition;

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
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      <div className={styles.container}>
        <div className={styles.tracker}>
          <SimpleTracker value={selectedTraumas.length} max={4} type='dagger' />
        </div>
        <ExampleList
          items={options}
          selectable
          selectedItems={selectedTraumas}
          onItemSelected={onItemSelect}
        />
      </div>
    </ModuleWrapper>
  );
}
