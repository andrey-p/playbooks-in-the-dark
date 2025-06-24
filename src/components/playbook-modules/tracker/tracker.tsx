import { z } from 'zod';
import SimpleTracker from '@/components/playbook-elements/trackers/simple-tracker';
import Clock from '@/components/playbook-elements/trackers/clock';
import PropsSchema from './tracker.schema';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';
import styles from './tracker.module.css';
import clsx from 'clsx';

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
      <div className={clsx(styles.container, styles[moduleProps.type])}>
        {moduleProps.type === 'clock' ? (
          <Clock
            {...moduleProps}
            value={value}
            onValueSelect={onValueSelect}
            label={moduleDefinition.label}
          />
        ) : (
          <SimpleTracker
            {...moduleProps}
            value={value}
            label={moduleDefinition.label}
            onValueSelect={onValueSelect}
          />
        )}
      </div>
    </ModuleWrapper>
  );
}
