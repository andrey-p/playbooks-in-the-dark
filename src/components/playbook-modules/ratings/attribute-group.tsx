import { z } from 'zod';
import {
  Attribute as AttributeSchema,
  Action as ActionSchema
} from './ratings.schema';
import { TrackerProps as TrackerPropsSchema } from '@/components/trackers/trackers.schema';
import Tracker from '@/components/trackers/simple-tracker';
import styles from './attribute-group.module.css';

type AttributeType = z.infer<typeof AttributeSchema>;
type ActionType = z.infer<typeof ActionSchema>;
type TrackerPropsType = z.infer<typeof TrackerPropsSchema>;

type Props = {
  attribute: AttributeType;
  actions: ActionType[];
  currentRatings: Record<string, number>;
  xp: number;
  onRatingUpdate: (actionName: string, value: number) => void;
  onXpUpdate: (attributeName: string, value: number) => void;
  trackerProps?: TrackerPropsType;
};

export default function AttributeGroup(props: Props) {
  const {
    attribute,
    actions,
    currentRatings,
    xp,
    onRatingUpdate,
    onXpUpdate,
    trackerProps
  } = props;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{attribute.name}</h3>
      <div className={styles.xp}>
        <Tracker
          max={6}
          type='dagger'
          {...trackerProps}
          value={xp}
          onValueSelect={(value) => {
            onXpUpdate(attribute.id, value);
          }}
        />
      </div>

      <ul className={styles.ratings}>
        {actions.map((action) => (
          <li key={action.id} className={styles.rating}>
            <Tracker
              value={currentRatings[action.id] || 0}
              max={4}
              type='circle'
              onValueSelect={(value) => {
                onRatingUpdate(action.id, value);
              }}
            />
            <div className={styles.actionName}>{action.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
