import { z } from 'zod';
import PropsSchema from './multi-tracker.schema';
import SimpleTracker from '@/components/trackers/simple-tracker';
import ModuleWrapper from '../layout/module-wrapper';
import styles from './multi-tracker.module.css';

type Props = z.infer<typeof PropsSchema>;

export default function MultiTracker(props: Props) {
  const { moduleDefinition, playbookProps, userValue, onUpdate } = props;
  const { props: moduleProps } = moduleDefinition;
  const { trackers } = moduleProps;

  const onValueSelect = (trackerId: string, value: number) => {
    onUpdate({
      ...userValue,
      [trackerId]: value
    });
  };

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      {Object.keys(trackers).map((trackerId) => (
        <div key={trackerId} className={styles.tracker}>
          <SimpleTracker
            value={userValue[trackerId] || 0}
            max={trackers[trackerId].max}
            type={trackers[trackerId].trackerType}
            wrap={trackers[trackerId].wrap}
            onValueSelect={(value: number) => onValueSelect(trackerId, value)}
          />
          <div>{trackers[trackerId].label}</div>
        </div>
      ))}
    </ModuleWrapper>
  );
}
