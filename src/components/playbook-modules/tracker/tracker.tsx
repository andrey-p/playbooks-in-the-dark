import SimpleTracker from '@/components/trackers/simple-tracker';

type Props = {
  value: number;
  max: number;
  onValueSelect?: (value: number) => void;
  type: TrackerType;
};

export default function Tracker(props: Props) {
  return (
    <SimpleTracker
    />
  );
}
