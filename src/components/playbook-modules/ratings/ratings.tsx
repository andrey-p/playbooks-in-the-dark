import { z } from 'zod';
import PropsSchema, {
  Attribute as AttributeSchema,
  Action as ActionSchema
} from './ratings.schema';
import AttributeGroup from './attribute-group';
import ModuleWrapper from '@/components/playbook-layout/module-wrapper';

type Props = z.infer<typeof PropsSchema>;
type AttributeType = z.infer<typeof AttributeSchema>;
type ActionType = z.infer<typeof ActionSchema>;

export default function Ratings(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps } = props;
  const { props: moduleProps } = moduleDefinition;
  const { attributes, actions, trackerProps } = moduleProps;
  const startingRatings = playbookProps.startingRatings;
  const { actionRatings, attributeXp } = userValue;

  // if the user hasn't set any ratings yet,
  // use the starting ones that the playbook defines
  const currentRatings =
    Object.keys(actionRatings).length === 0 ? startingRatings : actionRatings;

  const onRatingUpdate = (actionName: string, value: number) => {
    onUpdate({
      actionRatings: {
        ...currentRatings,
        [actionName]: value
      },
      attributeXp
    });
  };

  const onXpUpdate = (attributeName: string, value: number) => {
    onUpdate({
      actionRatings: currentRatings,
      attributeXp: {
        ...attributeXp,
        [attributeName]: value
      }
    });
  };

  return (
    <ModuleWrapper
      moduleDefinition={moduleDefinition}
      playbookProps={playbookProps}
    >
      {attributes.map((attribute: AttributeType) => (
        <AttributeGroup
          key={attribute.id}
          attribute={attribute}
          xp={attributeXp[attribute.id]}
          currentRatings={currentRatings}
          trackerProps={trackerProps}
          onRatingUpdate={onRatingUpdate}
          onXpUpdate={onXpUpdate}
          actions={actions.filter(
            (action: ActionType) => action.attributeId === attribute.id
          )}
        />
      ))}
    </ModuleWrapper>
  );
}
