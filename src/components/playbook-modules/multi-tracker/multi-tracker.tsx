import { z } from 'zod';
import PropsSchema from './multi-tracker.schema';
import SimpleTracker from '@/components/trackers/simple-tracker';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';
import styles from './multi-tracker.module.css';
import clsx from 'clsx';

type Props = z.infer<typeof PropsSchema>;

export default function MultiTracker(props: Props) {
  const { moduleDefinition, playbookProps, userValue, onUpdate } = props;
  const { props: moduleProps } = moduleDefinition;
  const { trackers } = moduleProps;
  const { values } = userValue;

  const onValueSelect = (trackerId: string, value: number) => {
    onUpdate({
      values: {
        ...values,
        [trackerId]: value
      }
    });
  };

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      {Object.keys(trackers).map((trackerId) => (
        <div key={trackerId} className={clsx(styles.tracker, trackerId)}>
          <SimpleTracker
            {...trackers[trackerId]}
            value={values[trackerId] || 0}
            onValueSelect={(value: number) => onValueSelect(trackerId, value)}
          />
          <div className={clsx(`${trackerId}-label`)}>
            {trackers[trackerId].label}
          </div>
        </div>
      ))}
    </ModuleWrapper>
  );
}
