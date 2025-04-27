import { z } from 'zod';
import {
  Attribute as AttributeSchema,
  Action as ActionSchema
} from './ratings.schema';
import { TrackerProps as TrackerPropsSchema } from '@/components/playbook-elements/trackers/trackers.schema';
import Tracker from '@/components/playbook-elements/trackers/simple-tracker';
import Description from '@/components/playbook-elements/description/description';
import styles from './attribute-group.module.css';
import { useTranslations } from 'next-intl';

type AttributeType = z.infer<typeof AttributeSchema>;
type ActionType = z.infer<typeof ActionSchema>;
type TrackerPropsType = z.infer<typeof TrackerPropsSchema>;

type Props = {
  attribute: AttributeType;
  actions: ActionType[];
  currentRatings: Record<string, number>;
  xp: number;
  maxRating: number;
  onRatingUpdate: (actionName: string, value: number) => void;
  onXpUpdate: (attributeName: string, value: number) => void;
  trackerProps?: TrackerPropsType;
};

export default function AttributeGroup(props: Props) {
  const {
    attribute,
    actions,
    currentRatings,
    maxRating,
    xp,
    onRatingUpdate,
    onXpUpdate,
    trackerProps
  } = props;
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t(attribute.name)}</h3>
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
        {attribute.trackerLabel && <div>{t(attribute.trackerLabel)}</div>}
      </div>

      <ul className={styles.ratings}>
        {actions.map((action) => (
          <li key={action.id} className={styles.rating}>
            <Tracker
              value={currentRatings[action.id] || 0}
              max={maxRating}
              type='circle'
              onValueSelect={(value) => {
                onRatingUpdate(action.id, value);
              }}
            />
            <div className={styles.actionName}>{t(action.name)}</div>
          </li>
        ))}
      </ul>

      {attribute.description && <Description text={attribute.description} />}
    </div>
  );
}
