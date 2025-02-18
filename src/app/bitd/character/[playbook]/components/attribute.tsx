import CircleTracker from '@/components/trackers/circle/circle-tracker';
import DaggerTracker from '@/components/trackers/dagger/dagger-tracker';
import type { Attribute, Ratings } from '@/types';
import styles from './attribute.module.css';

type Props = {
  attribute: Attribute,
  ratings: Ratings
};

export default function Attribute(props: Props) {
  const { attribute, ratings } = props;
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{attribute.name}</h3>
      <div className={styles.xp}>
        <DaggerTracker
          value={2}
          max={6}
        />
      </div>

      <ul className={styles.ratings}>
        {attribute.actions.map(action => (
          <li
            key={action}
            className={styles.rating}
          >
            <CircleTracker value={ratings[action] || 0} max={4} />
            <div className={styles.actionName}>{action}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
