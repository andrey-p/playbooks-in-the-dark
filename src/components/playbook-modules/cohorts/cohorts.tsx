import { z } from 'zod';
import PropsSchema, {
  CohortValue as CohortValueSchema
} from './cohorts.schema';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';
import styles from './cohorts.module.css';
import Cohort from './cohort';

type Props = z.infer<typeof PropsSchema>;
type CohortValueType = z.infer<typeof CohortValueSchema>;

export default function Cohorts(props: Props) {
  const { moduleDefinition, playbookProps, userValue, onUpdate } = props;
  const { props: moduleProps } = moduleDefinition;
  const { slots, radioGroups, trackers } = moduleProps;
  let { cohorts: cohortValues } = userValue;

  // first time this module is rendered?
  // show any starting cohorts that the playbook defined
  if (!cohortValues.length && playbookProps?.startingCohorts?.length) {
    cohortValues = playbookProps?.startingCohorts;
  }

  const cohortProps = [];

  for (let i = 0; i < slots; i++) {
    cohortProps.push({
      radioGroups: radioGroups,
      trackers: trackers,
      values: cohortValues[i]
    });
  }

  const onCohortUpdate = (i: number, value: CohortValueType) => {
    const nextCohortValues = cohortValues.slice();

    // first time a cohort is saved, create empty slots for every entry
    // before setting the one that was just updated
    // nature abhors a sparse array
    for (let i = 0; i < slots; i++) {
      if (!nextCohortValues[i]) {
        nextCohortValues[i] = { trackers: {}, radioGroups: {}, text: '' };
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
