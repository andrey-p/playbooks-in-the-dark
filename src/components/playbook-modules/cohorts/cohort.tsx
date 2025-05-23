import { z } from 'zod';
import { useId } from 'react';
import { RadioGroupProps as RadioGroupPropsSchema } from '@/components/playbook-elements/radio-group/radio-group.schema';
import { TrackerPropsWithLabel as TrackerPropsSchema } from '@/components/playbook-elements/trackers/trackers.schema';
import { CohortValue as CohortValueSchema } from './cohorts.schema';
import RadioGroup from '@/components/playbook-elements/radio-group/radio-group';
import SimpleTracker from '@/components/playbook-elements/trackers/simple-tracker';
import styles from './cohort.module.css';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

type RadioGroupPropsType = z.infer<typeof RadioGroupPropsSchema>;
type TrackerPropsType = z.infer<typeof TrackerPropsSchema>;
type CohortValueType = z.infer<typeof CohortValueSchema>;

type Props = {
  radioGroups?: Record<string, RadioGroupPropsType>;
  trackers?: Record<string, TrackerPropsType>;
  values: CohortValueType;
  onUpdate: (value: CohortValueType) => void;
};

export default function Cohort(props: Props) {
  const { radioGroups, trackers, values, onUpdate } = props;
  const t = useTranslations();

  const consistentId = useId();

  const onRadioUpdate = (id: string, value: string | null) => {
    const nextRadioGroups = {
      ...values?.radioGroups,
      [id]: value
    };

    onUpdate({
      trackers: values?.trackers,
      radioGroups: nextRadioGroups,
      text: values?.text
    });
  };

  const onTrackerUpdate = (id: string, value: number) => {
    const nextTrackers = {
      ...values?.trackers,
      [id]: value
    };

    onUpdate({
      trackers: nextTrackers,
      radioGroups: values?.radioGroups,
      text: values?.text
    });
  };

  return (
    <div className={styles.container}>
      {trackers &&
        Object.keys(trackers).map((id) => (
          <div className={clsx(id)} key={id}>
            <SimpleTracker
              {...trackers[id]}
              value={values?.trackers[id]}
              onValueSelect={(value) => onTrackerUpdate(id, value)}
            />
            <div className={clsx(`${id}-label`)}>{t(trackers[id].label)}</div>
          </div>
        ))}
      {radioGroups &&
        Object.keys(radioGroups).map((id) => (
          <div className={clsx(styles.radio, id)} key={id}>
            <RadioGroup
              {...radioGroups[id]}
              value={values?.radioGroups[id]}
              onValueSelect={(value) => onRadioUpdate(id, value)}
            />
          </div>
        ))}
      <textarea
        className={styles.textArea}
        id={consistentId}
        name={consistentId}
        onChange={(e) =>
          onUpdate({
            trackers: values?.trackers || {},
            radioGroups: values?.radioGroups || {},
            text: e.currentTarget.value
          })
        }
        value={values?.text}
      />
    </div>
  );
}
