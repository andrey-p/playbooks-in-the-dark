import { z } from 'zod';
import SimpleTracker from '@/components/trackers/simple-tracker';
import Clock from '@/components/trackers/clock';
import PropsSchema from './tracker.schema';
import ModuleWrapper from '../layout/module-wrapper';

type Props = z.infer<typeof PropsSchema>;

export default function Tracker(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps } = props;
  const { props: moduleProps } = moduleDefinition;
  const { value } = userValue;

  const onValueSelect = (value: number) => {
    onUpdate({ value });
  };

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      {moduleProps.type === 'clock' ? (
        <Clock {...moduleProps} value={value} onValueSelect={onValueSelect} />
      ) : (
        <SimpleTracker
          {...moduleProps}
          value={value}
          onValueSelect={onValueSelect}
        />
      )}
    </ModuleWrapper>
  );
}
