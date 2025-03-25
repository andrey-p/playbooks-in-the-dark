import { z } from 'zod';
import PropsSchema, {
  CohortValue as CohortValueSchema
} from './cohorts.schema';
import ModuleWrapper from '../layout/module-wrapper';
import styles from './cohorts.module.css';
import Cohort from './cohort';

type Props = z.infer<typeof PropsSchema>;
type CohortValueType = z.infer<typeof CohortValueSchema>;

export default function Cohorts(props: Props) {
  const { moduleDefinition, playbookProps, userValue, onUpdate } = props;
  const { props: moduleProps } = moduleDefinition;
  const { slots, radioGroups } = moduleProps;
  let { cohorts: cohortValues } = userValue;

  const cohortProps = [];

  for (let i = 0; i < slots; i++) {
    cohortProps.push({
      radioGroups: radioGroups,
      values: cohortValues[i]
    });
  }

  const onCohortUpdate = (i: number, value: CohortValueType) => {
    const nextCohortValues = cohortValues.slice();

    // first time a cohort is saved, create empty slots for every entry
    // before setting the one that was just updated
    // nature abhors a sparse array
    if (nextCohortValues.length === 0) {
      for (let i = 0; i < slots; i++) {
        nextCohortValues.push({ radioGroups: {}, text: '' });
      }
    }

    nextCohortValues[i] = value;

    onUpdate({ cohorts: nextCohortValues });
  };

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      <ul className={styles.container}>
        {cohortProps.map((props, i) => (
          <li key={i} className={styles.item}>
            <Cohort {...props} onUpdate={(value) => onCohortUpdate(i, value)} />
          </li>
        ))}
      </ul>
    </ModuleWrapper>
  );
}
