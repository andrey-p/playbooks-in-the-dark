import CircleTracker from '@/components/trackers/circle/circle-tracker';
import DaggerTracker from '@/components/trackers/dagger/dagger-tracker';
import type { AttributeWithActions, ActionRatings } from '@/types';
import styles from './ratings.module.css';

type Props = {
  attributeWithActions: AttributeWithActions,
  currentActionRatings: ActionRatings
};

export default function Ratings(props: Props) {
  const { attributeWithActions, currentActionRatings } = props;
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{attributeWithActions.name}</h3>
      <div className={styles.xp}>
        <DaggerTracker
          value={2}
          max={6}
        />
      </div>

      <ul className={styles.ratings}>
        {attributeWithActions.actions.map(action => (
          <li
            key={action}
            className={styles.rating}
          >
            <CircleTracker value={currentActionRatings[action] || 0} max={4} />
            <div className={styles.actionName}>{action}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
