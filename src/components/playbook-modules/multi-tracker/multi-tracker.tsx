import { z } from 'zod';
import PropsSchema from './multi-tracker.schema';
import SimpleTracker from '@/components/trackers/simple-tracker';

type Props = z.infer<typeof PropsSchema>;

export default function MultiTracker(props: Props) {
  const { moduleDefinition, userValue, onUpdate } = props;
  const { props: moduleProps, label } = moduleDefinition;
  const { trackers } = moduleProps;

  const onValueSelect = (trackerId: string, value: number) => {
    onUpdate({
      ...userValue,
      [trackerId]: value
    });
  };

  return (
    <div>
      <h3>{label}</h3>
      {Object.keys(trackers).map((trackerId) => (
        <SimpleTracker
          key={trackerId}
          value={userValue[trackerId] || 0}
          max={trackers[trackerId].max}
          type={trackers[trackerId].trackerType}
          onValueSelect={(value: number) => onValueSelect(trackerId, value)}
        />
      ))}
    </div>
  );
}
