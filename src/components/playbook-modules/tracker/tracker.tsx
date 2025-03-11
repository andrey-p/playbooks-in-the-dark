import { z } from 'zod';
import SimpleTracker from '@/components/trackers/simple-tracker';
import Clock from '@/components/trackers/clock';
import PropsSchema from './tracker.schema';

type Props = z.infer<typeof PropsSchema>;

export default function Tracker(props: Props) {
  const { moduleDefinition, userValue, onUpdate } = props;
  const { props: moduleProps, label } = moduleDefinition;
  const { max, trackerType } = moduleProps;

  return (
    <div>
      <h3>{label}</h3>

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
    </div>
  );
}
