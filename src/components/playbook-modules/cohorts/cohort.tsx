import { z } from 'zod';
import { useId } from 'react';
import { RadioGroupProps as RadioGroupPropsSchema } from '@/components/playbook-elements/radio-group/radio-group.schema';
import { CohortValue as CohortValueSchema } from './cohorts.schema';
import RadioGroup from '@/components/playbook-elements/radio-group/radio-group';
import styles from './cohort.module.css';

type RadioGroupPropsType = z.infer<typeof RadioGroupPropsSchema>;
type CohortValueType = z.infer<typeof CohortValueSchema>;

type Props = {
  radioGroups: Record<string, RadioGroupPropsType>;
  values: CohortValueType;
  onUpdate: (value: CohortValueType) => void;
};

export default function Cohort(props: Props) {
  const { radioGroups, values, onUpdate } = props;

  const consistentId = useId();

  const onRadioUpdate = (id: string, value: string | null) => {
    const nextRadioGroups = {
      ...values?.radioGroups,
      [id]: value
    };

    onUpdate({
      radioGroups: nextRadioGroups,
      text: values?.text || ''
    });
  };

  return (
    <div className={styles.container}>
      {Object.keys(radioGroups).map((id) => (
        <div className={styles.radio} key={id}>
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
            radioGroups: values?.radioGroups || {},
            text: e.currentTarget.value
          })
        }
        value={values?.text}
      />
    </div>
  );
}
