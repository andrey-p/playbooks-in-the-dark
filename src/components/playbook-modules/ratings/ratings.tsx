import { z } from "zod";
import { SharedModuleProps } from "../playbook-modules.types";
import schemas, {
  Attribute as AttributeSchema,
  Action as ActionSchema
} from "./ratings.schema";
import AttributeGroup from "./attribute-group";

type AttributeType = z.infer<typeof AttributeSchema>;
type ActionType = z.infer<typeof ActionSchema>;

type Props = SharedModuleProps<z.infer<typeof schemas.UserValue>> & {
  moduleDefinition: {
    props: z.infer<typeof schemas.SystemProps>;
  };
  playbookProps: z.infer<typeof schemas.PlaybookProps>;
};

export default function Ratings(props: Props) {
  const { moduleDefinition, userValue, onUpdate, playbookProps } = props;
  const { label, props: moduleProps } = moduleDefinition;
  const { attributes, actions } = moduleProps;
  const startingRatings = playbookProps;
  const { actionRatings, attributeXp } = userValue;

  // if ratings aren't defined, use the starting ones for the playbook
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
    <div>
      <h3>{label}</h3>
      {attributes.map((attribute: AttributeType) => (
        <AttributeGroup
          key={attribute.id}
          attribute={attribute}
          xp={attributeXp[attribute.id]}
          currentRatings={currentRatings}
          onRatingUpdate={onRatingUpdate}
          onXpUpdate={onXpUpdate}
          actions={actions.filter(
            (action: ActionType) => action.attributeId === attribute.id
          )}
        />
      ))}
    </div>
  );
}
