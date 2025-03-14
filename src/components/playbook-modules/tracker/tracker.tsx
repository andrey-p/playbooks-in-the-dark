import { z } from 'zod';
import SimpleTracker from '@/components/trackers/simple-tracker';
import Clock from '@/components/trackers/clock';
import PropsSchema from './tracker.schema';
import ModuleWrapper from '../layout/module-wrapper';

type Props = z.infer<typeof PropsSchema>;

export default function Tracker(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps } = props;
  const { props: moduleProps } = moduleDefinition;
  const { max, trackerType } = moduleProps;

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      {trackerType === 'clock' ? (
        <Clock value={userValue} max={max} onValueSelect={onUpdate} />
      ) : (
        <SimpleTracker
          value={userValue}
          max={max}
          type={trackerType}
          onValueSelect={onUpdate}
        />
      )}
    </ModuleWrapper>
  );
}
