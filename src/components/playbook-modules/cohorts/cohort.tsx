import { z } from 'zod';
import { useId } from 'react';
import { RadioGroupPropsWithLabel as RadioGroupPropsSchema } from '@/components/playbook-elements/radio-group/radio-group.schema';
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
  index: number;
  onUpdate: (value: CohortValueType) => void;
};

export default function Cohort(props: Props) {
  const { radioGroups, trackers, index, values, onUpdate } = props;
  const t = useTranslations();

  const trackerValues = values?.trackers || {};
  const radioGroupValues = values?.radioGroups || {};
  const textValue = values?.text || '';

  const consistentId = useId();

  const onRadioUpdate = (id: string, value: string | null) => {
    const nextRadioGroups = {
      ...radioGroupValues,
      [id]: value
    };

    onUpdate({
      trackers: trackerValues,
      radioGroups: nextRadioGroups,
      text: textValue
    });
  };

  const onTrackerUpdate = (id: string, value: number) => {
    const nextTrackers = {
      ...trackerValues,
      [id]: value
    };

    onUpdate({
      trackers: nextTrackers,
      radioGroups: radioGroupValues,
      text: textValue
    });
  };

  return (
    <div className={styles.container}>
      {trackers &&
        Object.keys(trackers).map((id) => (
          <div className={clsx(id)} key={id}>
            <SimpleTracker
              {...trackers[id]}
              value={trackerValues[id]}
              labelledBy={consistentId + 't' + id}
              onValueSelect={(value) => onTrackerUpdate(id, value)}
            />
            <div className={clsx(`${id}-label`)} id={consistentId + 't' + id}>
              {t(trackers[id].label)}
            </div>
          </div>
        ))}
      {radioGroups &&
        Object.keys(radioGroups).map((id) => (
          <div className={clsx(styles.radio, id)} key={id}>
            <RadioGroup
              {...radioGroups[id]}
              value={radioGroupValues[id]}
              label={radioGroups[id].label}
              onValueSelect={(value) => onRadioUpdate(id, value)}
            />
          </div>
        ))}
      <textarea
        className={styles.textArea}
        aria-label={t('UI.ModulesShared.cohortDescriptionLabel', {
          number: index + 1
        })}
        id={consistentId}
        name={consistentId}
        onChange={(e) =>
          onUpdate({
            trackers: trackerValues,
            radioGroups: radioGroupValues,
            text: e.currentTarget.value
          })
        }
        value={textValue}
      />
    </div>
  );
}
