import Tracker from '@/components/trackers/simple-tracker';
import type { AttributeWithActions, ActionRatings } from '@/types';
import styles from './ratings.module.css';

type Props = {
  attributeWithActions: AttributeWithActions,
  currentActionRatings: ActionRatings,
  xp: number,
  onRatingUpdate: (actionName: string, value: number) => void,
  onXpUpdate: (attributeName: string, value: number) => void
};

export default function Ratings(props: Props) {
  const {
    attributeWithActions,
    currentActionRatings,
    xp,
    onRatingUpdate,
    onXpUpdate
  } = props;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{attributeWithActions.id}</h3>
      <div className={styles.xp}>
        <Tracker
          value={xp}
          max={6}
          type='dagger'
          onValueSelect={(value) => {
            onXpUpdate(attributeWithActions.id, value);
          }}
        />
      </div>

      <ul className={styles.ratings}>
        {attributeWithActions.actions.map(action => (
          <li
            key={action}
            className={styles.rating}
          >
            <Tracker
              value={currentActionRatings[action] || 0}
              max={4}
              type='circle'
              onValueSelect={(value) => {
                onRatingUpdate(action, value);
              }}
            />
            <div className={styles.actionName}>{action}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
